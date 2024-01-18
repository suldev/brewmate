FROM node:current-alpine

COPY . .
WORKDIR /app

RUN ["npm", "install"]

EXPOSE 80

CMD ["npm", "run", "start:dev"]