# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

ENV REACT_APP_API_URL="http://localhost:8000"

ENV REACT_APP_KEYCLOAK_URL="http://localhost:8080"

ENV REACT_APP_KEYCLOAK_REALM="reports-realm"

ENV REACT_APP_KEYCLOAK_CLIENT_ID="reports-frontend"
# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 