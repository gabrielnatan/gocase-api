# Gocase App

Este é um aplicativo backend construído com Node.js e Docker, que utiliza MongoDB, Redis e integra com a API da OpenAI.

## Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Configuração

Antes de subir o projeto, certifique-se de criar um arquivo `.env` na raiz da pasta da API com as seguintes variáveis:

```env
OPENAI_API_KEY=your_openai_api_key

PORT=3000

MONGO_USER=admin
MONGO_PASSWORD=password
MONGO_DATABASE=gocase

JWT_SECRET=supersecret
REDIS_URL=redis://redis:6379
NODE_ENV=development
