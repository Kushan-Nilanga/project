# Application Dockerfile
FROM --platform=linux/amd64 329045634983.dkr.ecr.ap-southeast-2.amazonaws.com/node:latest
WORKDIR /app
COPY /auth-service/package*.json .
COPY ./auth-service .
RUN npm install --verbose --force
EXPOSE 3000
CMD ["npm", "start"]
