FROM node:latest

WORKDIR /app

COPY package.json package-lock.json./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "build"]