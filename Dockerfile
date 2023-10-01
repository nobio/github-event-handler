FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 31000 31000
CMD [ "npm", "start" ]
