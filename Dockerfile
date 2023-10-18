FROM node:16

# Create app directory...
WORKDIR /usr/src/app

COPY package*.json ./

COPY index.js ./
COPY src/lib/ ./src/lib/
COPY src/bin/ ./src/bin/

RUN ls --recursive

RUN npm install --omit=dev

# Bundle app source
#COPY . .

EXPOSE 31000 31000
CMD [ "npm", "start" ]
