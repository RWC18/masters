FROM node:20-alpine AS builder

WORKDIR /var/www/server

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /var/www/server

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built files from builder stage
COPY --from=builder /var/www/server/dist ./dist

# Copy any other necessary files (like keys.ts if needed)
COPY keys.ts ./

ENV NODE_OPTIONS="--max-http-header-size=65536"

EXPOSE 3000

CMD [ "node", "dist/index.js" ]
