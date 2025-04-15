FROM node:22

WORKDIR /app/

COPY package.json ./
COPY tsconfig.json ./
COPY src/ ./src/
COPY .production.env .production.env

RUN npm install

CMD npm run db:migrate && npm start