FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY ./ ./

RUN npm install

EXPOSE 5000

VOLUME [ "/app/node_modules" ]

CMD ["npm", "start"]