FROM node:18

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV CLOUD_ENV=production \
  NODE_ENV=production \
  PORT=3000

CMD [ "node", "app.js" ]
