FROM node:14
ADD . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
CMD node ./src/app.js
EXPOSE 3309:3309