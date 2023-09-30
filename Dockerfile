FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production --omit=dev

# Bundle app source
COPY . .

EXPOSE 31000 31000
CMD [ "npm", "start" ]
