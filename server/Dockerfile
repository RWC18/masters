FROM node:20-alpine
WORKDIR /var/www/server
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV NODE_OPTIONS="--max-http-header-size=65536"

CMD [ "node", "build/index.js" ]
