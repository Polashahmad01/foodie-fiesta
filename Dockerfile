FROM node:18

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install --production

COPY . /app

ENV NODE_ENV=production

CMD [ "node", "app.js" ]
