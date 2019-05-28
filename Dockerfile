FROM node:10.15.1-slim

WORKDIR /usr/src
RUN chown node:node -R /usr/src

USER node

COPY --chown=node:node yarn.lock .
COPY --chown=node:node package.json .

RUN yarn

COPY --chown=node:node tsconfig.json .
COPY --chown=node:node src src

RUN yarn build

CMD ["yarn", "start"]