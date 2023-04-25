# Application Dockerfile
FROM --platform=linux/amd64 node:20-alpine
WORKDIR /app
COPY /bff-service/package*.json .
RUN npm install
COPY ./bff-service .
EXPOSE 3000
CMD ["npm", "start"]
