FROM node:12

# Creating app directory
WORKDIR /

# Install dependencies and wildcard(*) to copy both package-lock.json and package.json
COPY package*.json ./

# We have problem accessing sources, need double check
COPY * /

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "src/server/js/server.js" ]
