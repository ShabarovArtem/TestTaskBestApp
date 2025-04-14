FROM node:22

ENV UID=1000
ENV USER=node

WORKDIR /app/

ENV API_HOST="0.0.0.0"
ENV API_PORT=9000

COPY package.json .
COPY tsconfig.json .
RUN npm install

COPY src/ src/

CMD ["npm", "start"]