FROM node:16

# Create app directory...
WORKDIR /usr/src/app

COPY . .
RUN rm -r docker-compose.yaml .git .github .env src/ressources

RUN ls --recursive ./

RUN npm install --omit=dev


EXPOSE 31000 31000
CMD [ "npm", "start" ]
