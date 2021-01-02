FROM node:12

# Creating app directory
WORKDIR /Demonstration/

# Install dependencies and wildcard(*) to copy both package-lock.json and package.json
COPY package*.json ./
COPY * /

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "src/server/js/server.js" ]
