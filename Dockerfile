FROM node:20

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/zooshop-frontend
RUN npm i
RUN npm run build


WORKDIR /usr/src/app/zooshop-backend
RUN npm i

EXPOSE 3000

CMD [ "node", "app.js" ]