FROM node:22

WORKDIR /app/

COPY package.json ./
COPY tsconfig.json ./
COPY src/ ./src/

RUN npm install

CMD npm run db:migrate && npm start