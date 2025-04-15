# Test task for BestApp

## Установка

````
git clone https://github.com/ShabarovArtem/TestTaskBestApp.git
cd TestTaskBestApp
npm install
````

## Запуск

### Development
Настройки бд в .development.env
````
npm run start:dev
````
### Production
Настройки бд в .production.env
#### docker-compose
Настройки докера в .development.docker.env
````
docker-compose up -d
````
### Swagger
http://localhost:9000/api/docs

### Подключение к WebSocket

Сначала необходимо указать данные "fullName" в таблицу participants
http://localhost:9000/participants

В ответ приходит participantId (например sCuB5Xj)
Указываем его как query параметр по ссылке
http://localhost:9000/kitchen

Пример присоединения в Postman: http://localhost:9000/kitchen?participantId=sCuB5Xj

Дальше необходимо прослушивать событие CookingChallenge



