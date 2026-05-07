FROM node:20-alpine

WORKDIR /app

# Copy root config files and monorepo files
COPY package.json package-lock.json turbo.json ./
COPY apps/backend/package.json ./apps/backend/

# Install dependencies (only for backend using workspace filter if supported)
RUN npm install

# Copy application files
COPY apps/backend ./apps/backend/

# Generate Prisma Client
WORKDIR /app/apps/backend
RUN npx prisma generate

# Build
RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]
