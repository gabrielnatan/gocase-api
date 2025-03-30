import express, { Request, Response } from "express";
import { ChatModel } from "../../../chat/db/mongo/model/chat.model.js";
import { ListChatUseCase } from "../../../../application/chat/list/list-chat.use-case.js";
import { CreateChatUseCase } from "../../../../application/chat/create/create-chat.use-case.js";
import { UpdateChatUseCase } from "../../../../application/chat/update/update-chat.use-case.js";
import { DeleteChatUseCase } from "../../../../application/chat/delete/delete-chat.use-case.js";
import { GetChatUseCase } from "../../../../application/chat/get/get-user.use-case.js";
import { ChatRepository } from "../../../chat/db/mongo/repository/message.repository.js";
import { FirstMessageUseCase } from "../../../../application/ai/chatgpt/first-message.use-case.js";
import { MessageRepository } from "../../../message/db/mongo/repository/message.repository.js";
import { MessageModel } from "../../../message/db/mongo/model/message.model.js";
import { ChatGPTService } from "../../../ai/chatgpt/chatgpt.js";
import OpenAI from "openai";
import { Uuid } from "../../../../@sahred/domain/value-object/uuid/uuid.entity.js";

const chatRouter = express.Router();

const chatRepository = new ChatRepository(ChatModel);
const getChatUseCase = new GetChatUseCase(chatRepository);
const listChatUseCase = new ListChatUseCase(chatRepository);
const createChatUseCase = new CreateChatUseCase(chatRepository);
const updateChatUseCase = new UpdateChatUseCase(chatRepository);
const deleteChatUseCase = new DeleteChatUseCase(chatRepository);

const openAi = new OpenAI({
    apiKey: process.env.API_KEY_CHAT_GPT,
});


const messageRepository = new MessageRepository(MessageModel);
const updateChat = new UpdateChatUseCase(chatRepository)
const chatGPTService = new ChatGPTService(updateChat, openAi, messageRepository);
const firstMessageUseCase = new FirstMessageUseCase(chatGPTService, chatRepository);

const handleError = (res: Response, error: unknown) => {
    if (error instanceof Error) {
        res.status(400).json({ message: error.message });
    } else {
        res.status(500).json({ message: "An unexpected error occurred." });
    }
};

chatRouter.get('/', async (req: Request, res: Response) => {
    const user_id = req.user.id
    try {
        const chats = await listChatUseCase.execute({ user_id:user_id as string});
        res.json({ message: chats });
    } catch (error) {
        handleError(res, error);
    }
});

chatRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const chat = await getChatUseCase.execute({ id });
        res.json({ message: chat });
    } catch (error) {
        handleError(res, error);
    }
});

chatRouter.post('/', async (req: Request, res: Response) => {
    const { id } = req.user;
    try {
        const { 
            title
        } = req.body

        const chatDTO = { 
            title,
            user_id:id 
        };

        const chat = await createChatUseCase.execute(chatDTO as any);
        const response = await firstMessageUseCase.execute(new Uuid(chat.id))
        console.log("AQUI MESMO ", response)
        res.status(201).json({ message: chat });
    } catch (error) {
        handleError(res, error);
    }
});

chatRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { 
            title
         } = req.body;
        
         const chatDTO = { 
            id, 
            title 
         };
        const chat = await updateChatUseCase.execute(chatDTO as any);
        res.json({ message: chat });
    } catch (error) {
        handleError(res, error);
    }
});

chatRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const chat = await deleteChatUseCase.execute({ id });
        res.json({ message: chat });
    } catch (error) {
        handleError(res, error);
    }
});

export { chatRouter };
