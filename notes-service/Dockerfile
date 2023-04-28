# Application Dockerfile
FROM --platform=linux/amd64 329045634983.dkr.ecr.ap-southeast-2.amazonaws.com/node:latest
WORKDIR /app
COPY /notes-service/package*.json .
COPY ./notes-service .
RUN npm install --verbose --force
RUN npm test
EXPOSE 3000
CMD ["npm", "start"]
