
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --leagcy-peer-deps

COPY . .

EXPOSE 8000

CMD ["node", "app.js"]
