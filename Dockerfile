FROM node:12

WORKDIR /usr/src/app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm install --production

# Copy the local code to the container
COPY . .

RUN npm run build

# Start the service
CMD npm start