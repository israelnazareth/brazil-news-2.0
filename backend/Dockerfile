# Use a imagem base do Node.js
FROM node:14

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do aplicativo
COPY . .

# Exponha a porta em que a aplicação irá rodar
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["npm", "start"]