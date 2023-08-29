## Project Setup

```
yarn install
```

## Start Development Server

```
yarn run start:dev
```

it will start the development server on the port specified in env

## Start Listening To Stripe Webhooks (Only Run for Local Development)

First Run This Command to login to Stripe CLI. Open the link in the browser and login to your stripe account.

```
stripe login
```

Then Run This Command to start listening to webhooks

```
stripe listen --forward-to http://localhost:9090/payment/webhooks
```

## Build For Production

```
yarn build
``` 

## Start The Production Server

```
yarn start
```

## Fix Lint Errors

``` 
yarn run lint
```
