# Application Dockerfile
FROM --platform=linux/amd64 329045634983.dkr.ecr.ap-southeast-2.amazonaws.com/node:latest
WORKDIR /app
COPY /logs-service/package*.json .
RUN npm install
COPY ./logs-service .
EXPOSE 3000
CMD ["npm", "start"]
