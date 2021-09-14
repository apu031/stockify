## Description

Stockify (Backend)

## Installation

```bash
# install all the packages
$ npm i
```

## Running the app

```bash
# watch mode
$ docker compose up
```

```bash
# wait until container are fully up,
# and the app was able to to connect to postgres
# then open your terminal and write the two commands

# for migration,
$ docker exec stocks sh -c "npm run typeorm:migration:run"
# for seeding,
$ docker exec stocks sh -c "npm run typeorm:seed:run"
```

The APIs can be tested with the swagger-express-ui
```bash
# go to the following url
http://localhost:3000/api-docs 
```

1. You can either register a new user or use an existing user
* try /auth/login and fill out the following request body
```
{
  "username": test1
  "password": test1
}
```
* copy the jwt access token from the response "ey......"
* At the top right corner swagger has a button called "Authorize"
* click on the button and paste the token when prompted. You token is valid for 500 seconds
* You can now perform other endpoint tasks

2. You can view your profile:
* try /profile
```
{
  "userId": "314c7707-2493-4a6e-9bc0-b021f6a28d7d",
  "username": "test1"
}
```

3. You can view your portfolio:
* try /portfolio
```
{
  "portfolioId": "ceee4fa0-e163-417f-9c59-bc32aced4999",
  "userId": "314c7707-2493-4a6e-9bc0-b021f6a28d7d",
  "walletBalance": "14080",
  "bought": "{\"STAN\":2}",
  "sold": "{\"STAN\":1}",
  "current": "{\"STAN\":1}",
  "createdTs": "2021-09-14T02:56:31.364Z",
  "updatedTs": "2021-09-14T02:56:31.364Z"
}
```

4. You can fund your wallet:
* try /fund and fill out the request body:
```
{
  "fund": 300
}
```
* Your wallet should be funded, and you can check it
through /portfolio
  
5. To buy stocks:
* try /buy/:stocks endpoint.
* choose the available stocks from the drop-down,
it will automatically fill in the parameter portion of the url
* Fill the request body too with how many shares you want to buy
```
{
  "quantity": 2
}
```
* Upon successful transaction, you can check it
  through /portfolio

5. To sell stocks:
* try /sell/:stocks endpoint.
* choose the available stocks from the drop-down,
  it will automatically fill in the parameter portion of the url
* Fill the request body too with how many shares you want to sell
```
{
  "quantity": 1
}
```
* Upon successful transaction, you can check it
  through /portfolio
  
6. To subscribe for stock prices, a cron job is created with nestjs
task scheduler. However, for now, it just prints the console.log in docker console.
   * try /subscribe/prices and /unsubscribe/prices

## Test

```bash
# unit tests
$ npm run test
```
