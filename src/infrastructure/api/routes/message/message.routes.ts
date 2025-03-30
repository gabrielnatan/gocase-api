import express, { Request, Response } from "express";
import { MessageModel } from "../../../message/db/mongo/model/message.model.js";
import { GetMessageUseCase } from "../../../../application/message/get/get-message.use-case.js";
import { ListMessageUseCase } from "../../../../application/message/list/list-message.use-case.js";
import { CreateMessageUseCase } from "../../../../application/message/create/create-message.use-case.js";
import { UpdateMessageUseCase } from "../../../../application/message/update/update-message.use-case.js";
import { DeleteMessageUseCase } from "../../../../application/message/delete/delete-message.use-case.js";
import { MessageRepository } from "../../../message/db/mongo/repository/message.repository.js";
import { ListMessageByChatId } from "../../../../application/message/list/list-message-by-chat-id.use-case.js";
import { ChatGPTService } from "../../../ai/chatgpt/chatgpt.js";
import { ChatRepository } from "../../../chat/db/mongo/repository/message.repository.js";
import { SendMessageUseCase } from "../../../../application/ai/chatgpt/send-message.use-case.js";
import { Uuid } from "../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import OpenAI from "openai";
import { UpdateChatUseCase } from "../../../../application/chat/update/update-chat.use-case.js";
import { FirstMessageUseCase } from "../../../../application/ai/chatgpt/first-message.use-case.js";
import { createUploadMiddleware } from "../../../../@sahred/infrastructure/middleware/multer.middleware.js";
import { CreateCampaignUseCase } from "../../../../application/campaign/create/create-campaign.use-case.js";
import { CampaignRepository } from "../../../campaign/db/mongo/repository/campaign.repository.js";

const messageRouter = express.Router();

const messageRepository = new MessageRepository(MessageModel);
const getMessageUseCase = new GetMessageUseCase(messageRepository);
const listMessageUseCase = new ListMessageUseCase(messageRepository);
const createMessageUseCase = new CreateMessageUseCase(messageRepository);
const updateMessageUseCase = new UpdateMessageUseCase(messageRepository);
const deleteMessageUseCase = new DeleteMessageUseCase(messageRepository);
const listMessageByChatIdUseCase = new ListMessageByChatId(messageRepository);


const openAi = new OpenAI({
    apiKey: process.env.API_KEY_CHAT_GPT,
});

const chatRepository = new ChatRepository();
const updateChat = new UpdateChatUseCase(chatRepository)

const campaignRepository =  new CampaignRepository()
const createCampaignUseCase =  new CreateCampaignUseCase(campaignRepository)
const chatGPTService = new ChatGPTService(updateChat, openAi, messageRepository,createCampaignUseCase);

const sendMessageUseCase = new SendMessageUseCase(chatGPTService, messageRepository, chatRepository);
const firstMessageUseCase = new FirstMessageUseCase(chatGPTService, chatRepository);


const handleError = (res: Response, error: unknown) => {
    if (error instanceof Error) {
        res.status(400).json({ message: error.message });
    } else {
        res.status(500).json({ message: "An unexpected error occurred." });
    }
};

messageRouter.get('/', async (req: Request, res: Response) => {
    try {
        const messages = await listMessageUseCase.execute({user_id: req.user.id as string});
        res.json({ message: messages });
    } catch (error) {
        handleError(res, error);
    }
});

messageRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const message = await getMessageUseCase.execute({ id });
        res.json({ message: message });
    } catch (error) {
        handleError(res, error);
    }
});

messageRouter.get('/message-by-chat-id/:chat_id', async (req: Request, res: Response) => {
    try {
        const { chat_id } = req.params;
        const message = await listMessageByChatIdUseCase.execute({ chat_id });
        res.json({ message: message });
    } catch (error) {
        res.json(error);
    }
});

messageRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { 
            chat_id,
            sender,
            content
        } = req.body

        const messageDTO = { 
            chat_id,
            sender,
            content 
        };

        const message = await createMessageUseCase.execute(messageDTO as any);
        res.status(201).json({ message: message });
    } catch (error) {
        handleError(res, error);
    }
});

messageRouter.post('/chat', async (req: Request, res: Response) => {
    try {
        const { 
            chat_id,
            content
        } = req.body

        const message = await sendMessageUseCase.execute(new Uuid(chat_id),content as any);
        res.status(201).json({ message: message });
    } catch (error) {
        handleError(res, error);
    }
});
messageRouter.post('/first_message', async (req: Request, res: Response) => {
    console.log("AQUI QUANTAS VEZES")
    try {
        const { 
            chat_id,
        } = req.body

        const message = await firstMessageUseCase.execute(new Uuid(chat_id));
        res.status(201).json({ message: message });
    } catch (error) {
        handleError(res, error);
    }
});


messageRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { 
            chat_id,
            sender,
            content 
         } = req.body;
        
         const messageDTO = { 
            id, 
            chat_id,
            sender,
            content 
         };
        const message = await updateMessageUseCase.execute(messageDTO as any);
        res.json({ message: message });
    } catch (error) {
        handleError(res, error);
    }
});

messageRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const message = await deleteMessageUseCase.execute({ id });
        res.json({ message: message });
    } catch (error) {
        handleError(res, error);
    }
});

messageRouter.post(
    "/upload",
    createUploadMiddleware("recursos", "images", 10), 
    async (req: Request, res: Response) => {
      try {
        const imageUrls = req.body.images; 
  
        res.status(201).json({
          message: "Upload realizado com sucesso",
          images: imageUrls,
        });
      } catch (error) {
        handleError(res, error);
      }
    }
  );

export { messageRouter };
