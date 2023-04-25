# Application Dockerfile
FROM --platform=linux/amd64 node:20-alpine
WORKDIR /app
COPY /auth-service/package*.json .
RUN npm install
COPY ./auth-service .
EXPOSE 3000
CMD ["npm", "start"]
