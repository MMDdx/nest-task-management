# Use Node.js 20 Alpine (lightweight)
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "run", "start:dev"]