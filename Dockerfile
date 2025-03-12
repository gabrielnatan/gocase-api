# Etapa 1: Construção da aplicação
FROM node:18-alpine AS build

# Definir diretório de trabalho no contêiner
WORKDIR /app

# Copiar package.json e package-lock.json para instalar dependências primeiro (cache eficiente)
COPY package.json package-lock.json ./

# Instalar dependências sem rodar scripts extras
RUN npm install --frozen-lockfile

# Copiar todo o código-fonte para dentro do contêiner
COPY . .

# Compilar TypeScript
RUN npm run build

# Etapa 2: Criando a imagem final
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos necessários da etapa de build
COPY --from=build /app/dist /app/dist
COPY package.json package-lock.json ./

# Instalar apenas as dependências de produção
RUN npm install --production

# Expor a porta que a API usa
EXPOSE 3000

# Definir variável de ambiente para produção
ENV NODE_ENV=production

# Comando para rodar a API
CMD ["node", "dist/infrastructure/api/server.js"]
