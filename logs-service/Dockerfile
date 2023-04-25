# Application Dockerfile
FROM --platform=linux/amd64 node:20-alpine
WORKDIR /app
COPY /logs-service/package*.json .
RUN npm install
COPY ./logs-service .
EXPOSE 3000
CMD ["npm", "start"]
