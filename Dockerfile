FROM node:21-alpine

RUN npm install -g pm2

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "start", "npm", "--", "start"]