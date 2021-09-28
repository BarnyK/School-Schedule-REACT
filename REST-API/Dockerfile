FROM node:alpine
WORKDIR /app
COPY package.json .
copy package-lock.json .
RUN npm install
COPY . .
CMD ["npm", "start"]

