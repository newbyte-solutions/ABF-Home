FROM node:18

WORKDIR /

COPY package*.json ./
RUN npm install

COPY . ./

RUN npm run build
RUN ls -R dist

EXPOSE 5000

CMD ["node", "dist/server.js"]
