FROM node:18-alpine

WORKDIR /

COPY package*.json ./
RUN npm install

COPY . ./

RUN npm run build
RUN ls -R dist

EXPOSE 3000

CMD ["node", "dist/server.js"]
