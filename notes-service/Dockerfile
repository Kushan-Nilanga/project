# Application Dockerfile
FROM --platform=linux/amd64 node:20-alpine
WORKDIR /app
COPY /notes-service/package*.json .
RUN npm install
COPY ./notes-service .
EXPOSE 3000
CMD ["npm", "start"]
