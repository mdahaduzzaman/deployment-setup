# Stage 1: Build the application
FROM node:18-alpine

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the react
CMD [ "npm", "run", "build" ]