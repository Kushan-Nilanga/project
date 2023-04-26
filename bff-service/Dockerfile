# Application Dockerfile
FROM --platform=linux/amd64 329045634983.dkr.ecr.ap-southeast-2.amazonaws.com/node:latest
WORKDIR /app
COPY /bff-service/package*.json .
RUN npm install
COPY ./bff-service .
EXPOSE 3000
CMD ["npm", "start"]
