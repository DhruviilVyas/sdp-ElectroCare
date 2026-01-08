# 1. Use the official Node.js image (Lightweight Alpine version)
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first (better caching)
COPY package.json package-lock.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the Next.js port
EXPOSE 3000

# 7. Start the application in Development mode
CMD ["npm", "run", "dev"]