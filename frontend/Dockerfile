# Multi-stage build for React Vite application

# Stage 1: Build stage with Node 18
FROM node:18 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Production stage with serve
FROM node:18-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy the built files from build stage
COPY --from=build /app/dist ./dist

# Expose port 5173
EXPOSE 5173

# Serve the application
CMD ["serve", "-s", "dist", "-l", "5173"]
