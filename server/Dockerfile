FROM node:20
WORKDIR /server
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npm", "start" ]