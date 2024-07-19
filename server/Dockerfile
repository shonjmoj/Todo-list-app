FROM node:20

WORKDIR /server

COPY . .

RUN npm i

RUN npm run build

EXPOSE 4173

CMD ["npm", "run" ,"start"]