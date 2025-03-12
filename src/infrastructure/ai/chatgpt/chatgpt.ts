import OpenAI from "openai";
import { config } from "dotenv";
import { UpdateChatUseCase } from "../../../application/chat/update/update-chat.use-case.js";
import { MessageRepository } from "../../message/db/mongo/repository/message.repository.js";
import { Message } from "../../../domain/message/entity/message/message.entity.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";

config();

interface ChatInfo{
    chat_id: string;
    title: string;
    messages: any[]
}

export class ChatGPTService {
    chat_id?:string
    title?:string
    messages: any[] = []

    constructor(
        private readonly updateChat: UpdateChatUseCase,
        private openai: OpenAI,
        private readonly messageRepository: MessageRepository
    ) {}

    async sendMessage(message: { role: "system" | "user" | "assistant"; content: string }): Promise<string> {
        try {
            const completion = await this.openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", 
                        content: 
                        `
                Você é um assistente amigável e divertido chamado Gocase AI.
                Você responde em no máximo 200 caracteres.
                Seu objetivo é ajudar a criar campanhas de marketing de forma eficiente.

                Para criar uma campanha, colete as seguintes informações:
                - Nome da campanha 📌
                - Objetivo da campanha 🎯 (Ex: engajamento, conversões, branding)
                - Produto/marca relacionada 🏷️
                - Tipo de conteúdo 📢 (Stories, Reels, Feed, YouTube, etc.)
                - Hashtags oficiais #️⃣
                - Influenciadores envolvidos 👥
                - Prazos importantes 📅 (data de entrega, data de publicação)
                - Materiais de apoio 📎 (imagens, vídeos, exemplos): Quando chegar nessaparte você deve chamar a função 'upload'
                - Revisão necessária? ✅ (Sim/Não)
                
                Após coletar essas informações, salve os seguintes parâmetros:
                {
                    nome: "Nome da campanha",
                    objetivo: "Objetivo da campanha",
                    produto: "Produto/marca relacionada",
                    tipoConteudo: "Tipo de conteúdo",
                    hashtags: ["#hashtag1", "#hashtag2"],
                    influenciadores: ["@influenciador1", "@influenciador2"],
                    prazos: { entrega: "data", publicacao: "data" },
                    materiais: ["link1", "link2"],
                    revisao: true
                }

                Depois de salvar os dados, chame a função:
                abc({ nome, objetivo, produto, tipoConteudo, hashtags, influenciadores, briefing, prazos, materiais, revisao });

                Certifique-se de responder de forma clara, direta e divertida! 😃
            ` 
                         },
                         ...this.messages,
                    message,
                ],
                store: true,
                functions:[
                  {
                    name: 'upload',
                    description: 'Quando chegar na parete em que o usuario deve fazer  upload das imagens ou videos',
                  },
                  {

                        name: 'abc',
                        description: 'A qualquer momento que o usuário pedir ou falar sobre um "console.log de abc" ou algo semelhante, por favor chame essa função.',
                        parameters: {
                            type: "object",
                            
                                properties: {
                                  "nome": {
                                    "type": "string",
                                    "description": "Nome da campanha"
                                  },
                                  "objetivo": {
                                    "type": "string",
                                    "description": "Objetivo da campanha"
                                  },
                                  "produto": {
                                    "type": "string",
                                    "description": "Produto ou marca relacionada"
                                  },
                                  "tipoConteudo": {
                                    "type": "string",
                                    "description": "Tipo de conteúdo a ser produzido (Stories, Reels, Feed, etc.)"
                                  },
                                  "resposta": {
                                    "type": "string",
                                    "description": "Deve ter um feedback para o usuraio, por exemplo 'dados cadastrados com sucesso' "
                                  },
                                  "hashtags": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "Lista de hashtags oficiais da campanha"
                                  },
                                  "influenciadores": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "Lista de influenciadores envolvidos na campanha"
                                  },
                                  "prazos": {
                                    "type": "object",
                                    "properties": {
                                      "entrega": {
                                        "type": "string",
                                        "format": "date",
                                        "description": "Data limite para entrega do conteúdo"
                                      },
                                      "publicacao": {
                                        "type": "string",
                                        "format": "date",
                                        "description": "Data esperada para a publicação do conteúdo"
                                      }
                                    },
                                    "description": "Prazos importantes da campanha"
                                  },
                                  "materiais": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "Lista de links para materiais de apoio"
                                  },
                                  "revisao": {
                                    "type": "boolean",
                                    "description": "Indica se o conteúdo precisa passar por revisão antes da publicação"
                                  }
                                }
                              ,                              
                            required: ["first_name", "last_name"]
                        }
                    }
                ],
                function_call: 'auto',
            });
            console.log("this.title ",this.title)
            console.log("completion ",completion.choices[0].message)
            if(this.title === 'new chat'){
                await this.createTitleChat(message.content)  
           }
            if(completion.choices[0].message.function_call?.name === 'abc'){
                const data = JSON.parse(completion.choices[0].message.function_call?.arguments) ?? null
                
                return await this.createCampanha(data)
            }
            if(completion.choices[0].message.function_call?.name === 'upload'){
              return await this.upload()
            }
            return completion.choices[0].message.content ?? "Desculpe, não consegui processar sua solicitação.";
        } catch (error) {
            console.error("Erro ao se comunicar com o ChatGPT:", error);
            throw new Error("Erro na comunicação com a API do ChatGPT.");
        }
    }
    
    chatInfo({ chat_id, title, messages }:ChatInfo){
        this.chat_id = chat_id 
        this.title = title
        this.messages = messages
    }

    async createTitleChat(message: string) {
        if (!this.chat_id) return;
    
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'Você é um assistente que gera títulos curtos e descritivos para conversas com base na primeira mensagem do usuário.'
                    },
                    {
                        role: 'user',
                        content: `Crie um título para a conversa com base nesta mensagem: "${message}". Responda apenas com o título e nada mais, sem aspas ou caracteres especiais.`
                    }
                ],
                max_tokens: 20
            });
    
            let title = completion.choices[0].message.content || 'Nova conversa';
    
            title = title.replace(/^"(.*)"$/, '$1');
    
            await this.updateChat.execute({
                id: this.chat_id,
                title: title
            });
    
        } catch (error) {
            console.error('Erro ao gerar título:', error);
        }
    }

    async createCampanha(
        data:
        {
            nome: string
            objetivo: string,
            produto: string,
            tipoConteudo: string,
            hashtags: string[],
            influenciadores: string[],
            prazos: { entrega: string, publicacao: string, },
            materiais: string[],
            revisao: boolean
        }
    ):Promise<string>{
        const message = Message.create({
            chat_id: new Uuid(this.chat_id).id,
            content:'Esse é o briefing:',
            type:'briefing',
            props:data,
            sender:'assistant',
            created_at: new Date(),
        })
        await this.messageRepository.insert(message)
        return message.content
    }


    async upload():Promise<string>{
      const message = Message.create({
          chat_id: new Uuid(this.chat_id).id,
          content:'Esse é o upload:',
          type:'upload',
          sender:'assistant',
          created_at: new Date(),
      })
      await this.messageRepository.insert(message)
      return message.content
  }
}
