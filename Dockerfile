FROM node:16

# Create app directory...
WORKDIR /usr/src/app

COPY . .
RUN rm -rf ./docker-compose.yaml
RUN rm -rf ./.git
RUN rm -rf ./.github
RUN rm -rf ./.env
RUN rm -rf ./src/ressources

RUN ls --recursive ./

RUN npm install --omit=dev


EXPOSE 31000 31000
CMD [ "npm", "start" ]
