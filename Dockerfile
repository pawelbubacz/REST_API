FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=9000
EXPOSE 9000
CMD ["npm", "start"]