FROM node:8-alpine

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm install --quiet
RUN npm test

COPY . .