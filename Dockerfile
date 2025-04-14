FROM node:22

WORKDIR /app/

COPY package.json .
COPY tsconfig.json .
RUN npm install

COPY src/ src/

CMD ["npm", "start"]