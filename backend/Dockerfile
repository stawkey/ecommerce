FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apt-get update && apt-get install -y curl
COPY . .
EXPOSE 8000
CMD ["node", "server.js"]
