import OpenAI from "openai";
import { config } from "dotenv";
import { UpdateChatUseCase } from "../../../application/chat/update/update-chat.use-case.js";
import { MessageRepository } from "../../message/db/mongo/repository/message.repository.js";
import { Message } from "../../../domain/message/entity/message/message.entity.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import fs from "fs";
import path from "path";
import { CreateCampaignUseCase } from "../../../application/campaign/create/create-campaign.use-case.js";
config();

interface ChatInfo {
  chat_id: string;
  title: string;
  messages: any[];
}

export class ChatGPTService {
  private chat_id?: string;
  private messages: any[] = [];

  constructor(
    private readonly updateChat: UpdateChatUseCase,
    private readonly openai: OpenAI,
    private readonly messageRepository: MessageRepository,
    private readonly createCampaignUseCase: CreateCampaignUseCase
  ) {}

  chatInfo({ chat_id, title, messages }: ChatInfo) {
    this.chat_id = chat_id;
    this.messages = messages;
  }

  async sendMessage(message: { role: "system" | "user" | "assistant"; content: string }): Promise<Message> {

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o",
        store: true,
        function_call: "auto",
        messages: [
          this.createSystemMessage(),
          ...this.messages,
          message,
        ],
        functions: this.getAvailableFunctions(),
      });

      const { content, function_call } = completion.choices[0].message;
      const functionName = function_call?.name;

      if (functionName === "briefing") {
        const data = JSON.parse(function_call?.arguments ?? "{}");
        console.log("AQUI MESMO ",data)
        return await this.createCampanha(data);
      }

      if (functionName === "upload") {
        return await this.upload();
      }

      if (functionName === "product") {
        this.createTitleChat(message);
        return await this.product();
      }

      if (functionName === "postagem") {
        return await this.postagem();
      }

      if (functionName === "influencers") {
        return await this.influencers();
      }

      const botResponse = content?.trim() || "[Gocase AI está pensando 🤔...]";

      const responseMessage = Message.create({
        chat_id: this.chat_id ?? '',
        sender: "assistant",
        content: botResponse,
        created_at: new Date(),
      });

      await this.messageRepository.insert(responseMessage);
      return responseMessage;
    } catch (error) {
      console.error("Erro ao se comunicar com o ChatGPT:", error);
      throw new Error("Erro na comunicação com a API do ChatGPT.");
    }
  }

  private createSystemMessage(): { role: "system"; content: string } {
    const promptPath = path.resolve("src", "infrastructure","ai","chatgpt","prompt","gocase-system-prompt.md");
    const content = fs.readFileSync(promptPath, "utf-8");
    return {
      role: "system",
      content:content.trim(),
    };
  }

  private getAvailableFunctions() {
    return [
      {
        name: "upload",
        description: "Chamado quando o usuário deve fazer upload de materiais de apoio."
      },
      {
        name: "product",
        description: "Chamado quando o usuário deve escolher produtos ou marcas."
      },
      {
        name: "postagem",
        description: "Chamado para seleção de formatos de conteúdo (Stories, Reels, etc)."
      },
      {
        name: "influencers",
        description: "Chamado quando o usuário deve selecionar influenciadores."
      },
      {
        name: "briefing",
        description: "Chamada final com os dados completos da campanha.",
        parameters: {
          type: "object",
          properties: {
            name: { type: "string" },
            goal: { type: "string" },
            products: { type: "array", items: { type: "string" } },
            content_type: { type: "string" },
            hashtags: { type: "array", items: { type: "string" } },
            influencers: { type: "array", items: { type: "string" } },
            dates: {
              type: "object",
              properties: {
                entrega: { type: "string", format: "date" },
                publicacao: { type: "string", format: "date" }
              },
              required: ["entrega", "publicacao"]
            },
            status: {
              type: "string",
              enum: ["active", "completed", "pending", "canceled", "archived"]
            },
            materials: { type: "array", items: { type: "string" } },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
            deleted_at: { type: ["string", "null"], format: "date-time" }
          },
          required: [
            "name",
            "goal",
            "products",
            "content_type",
            "hashtags",
            "influencers",
            "dates",
            "materials",
            "status",
            "created_at",
            "updated_at",
            "deleted_at"
          ]
        }
      }
    ];
  }
  

  async createTitleChat(triggerMessage: { role: string; content: string }) {
    if (!this.chat_id) return;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Você é um assistente que gera títulos curtos e descritivos para conversas com base no nome e objetivo da campanha.",
          },
          ...this.messages,
          triggerMessage,
          {
            role: "user",
            content: "Crie um título para a conversa com base nas mensagens anteriores. Responda apenas com o título, sem aspas ou caracteres especiais.",
          },
        ],
        max_tokens: 20,
      });

      let title = completion.choices[0].message.content ?? "Nova conversa";
      title = title.replace(/^"(.*)"$/, "$1");

      await this.updateChat.execute({ id: this.chat_id, title });
    } catch (error) {
      console.error("Erro ao gerar título do chat:", error);
    }
  }

  async createCampanha(data: any): Promise<Message> {
    console.log("AQUI CREATEAAAAA ",data)
    const message = Message.create({
      chat_id: new Uuid(this.chat_id).id,
      content: "Esse é o briefing:",
      type: "briefing",
      props: data,
      sender: "assistant",
      created_at: new Date(),
    });
    await this.createCampaignUseCase.execute(message.props as any)
    await this.messageRepository.insert(message);
    return message;
  }

  async upload(): Promise<Message> {
    return this.insertFunctionMessage("Faça upload dos recursos", "upload");
  }

  async product(): Promise<Message> {
    return this.insertFunctionMessage("Selecionar Produtos", "product");
  }

  async postagem(): Promise<Message> {
    return this.insertFunctionMessage("Onde você deseja que seja a postagem?", "postagem");
  }

  async influencers(): Promise<Message> {
    return this.insertFunctionMessage("Quais os influencers que vao fazer parte dessa campanha?", "influencers");
  }

  private async insertFunctionMessage(
    content: string,
    type: "briefing" | "message" | "upload" | "product" | "postagem" | "influencers" | undefined
  ): Promise<Message> {
    const message = Message.create({
      chat_id: new Uuid(this.chat_id).id,
      content,
      type,
      sender: "assistant",
      created_at: new Date(),
    });

    await this.messageRepository.insert(message);
    return message;
  }

 
}
