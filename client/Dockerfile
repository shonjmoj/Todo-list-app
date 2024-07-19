FROM node:20

WORKDIR /client

COPY . .

RUN npm i

RUN npm run build

EXPOSE 3000

CMD ["npm", "run" ,"preview"]