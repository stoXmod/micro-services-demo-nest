## MicroServices Architecture with Kafka - Demonstrate using an Ecommerce Order Processing System
- Set Up Kafka Locally : https://kafka.apache.org/quickstart
- Clone this repo
- Install dependencies

```jsx
yarn
```

- Start the Zoo-Keeper and Kafka Server
    - Go to extracted folder out from above “Set Up Kafka Locally” step. Then run below scripts in two new tabs.

```jsx
bin/zookeeper-server-start.sh config/zookeeper.properties

bin/kafka-server-start.sh config/server.properties
```

- In your project go to apps/api and rename .env-example to “.env” .Then replace “`MONGODB_URI=<ADD YOUR MONGODB URI HERE>`” with your mongoDB URI.
- Start the server

```jsx
yarn run dev
```