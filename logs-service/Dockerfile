# Application Dockerfile
FROM --platform=linux/amd64 329045634983.dkr.ecr.ap-southeast-2.amazonaws.com/node:latest
WORKDIR /app
COPY /logs-service/package*.json .
COPY ./logs-service .
RUN npm install --verbose --force
EXPOSE 3000
CMD ["npm", "start"]
