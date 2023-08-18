FROM --platform=linux/amd64 node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY src/ src/
COPY public/ public/

EXPOSE 3000
CMD [ "npm", "run", "start" ]