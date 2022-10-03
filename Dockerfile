FROM node:16-slim

WORKDIR /opt/app

COPY package* ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

ENV PORT=3000

CMD ["node", "index.js"]