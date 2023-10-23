FROM node:18

WORKDIR /app

COPY packge*.json /app

RUN npm install --production

COPY . /app

ENV NODE_ENV=production

CMD [ "node", "app.js" ]
