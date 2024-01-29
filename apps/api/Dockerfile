FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install --verbose

# Install Nest CLI globally
RUN yarn global add @nestjs/cli

COPY . .

CMD ["yarn", "start"]