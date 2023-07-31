FROM node:16.15.1

ARG HOST_ADDRESS
ARG PORT
ENV HOST_ADDRESS $HOST_ADDRESS
ENV HOST_PORT    $PORT

WORKDIR /tmp
COPY ./frontend/package.json      .
RUN npm install

WORKDIR /usr/src/app/art-generator
RUN rm -rf ./node_modules
RUN rm -f ./package-lock.json
RUN ln -sf /tmp/node_modules /usr/src/app/art-generator/.

RUN cp /tmp/package.json          .
RUN cp /tmp/package-lock.json             .
COPY ./frontend/.env              .
COPY ./frontend/public/           public/
COPY ./frontend/src/              src/

ENV NODE_ENV development
RUN npm run build

RUN npm install -g serve
# CMD ["npm", "run", "start"]
CMD ["serve", "-l", "3000", "-s", "./build"]