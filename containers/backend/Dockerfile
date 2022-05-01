FROM node:12

ENV NODE_ENV=production

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
