import express from "express";
import OpenAI from "openai";
import { config } from "dotenv";
config()

const openai = new OpenAI({
  apiKey: process.env.APY_KEY_CHAT_GPT
});

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    max_tokens:200,
    messages: [
        { role: "system", content: "Você é um assistente." },
        {
            role: "user",
            content: "Me diga olá.",
        },
    ],
    store: true,
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  console.log(completion)
  const message = await completion.choices[0].message;
  res.send(message);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

