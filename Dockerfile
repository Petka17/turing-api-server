FROM node:10.15.1

WORKDIR /usr/app

COPY yarn.lock .
COPY package.json .

RUN yarn

COPY tsconfig.json .
COPY src src

RUN yarn build

CMD ["yarn", "start"]