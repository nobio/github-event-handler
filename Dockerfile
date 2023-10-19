# node 16 because of compatibility reasons on arm7 platform
FROM node:16

# Create app directory...
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

# Bundle app source
COPY . .

EXPOSE 31000 31000
CMD [ "npm", "start" ]