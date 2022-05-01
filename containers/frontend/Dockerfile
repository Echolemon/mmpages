FROM node:14

ENV NODE_ENV=production

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "run", "prod-start"]
