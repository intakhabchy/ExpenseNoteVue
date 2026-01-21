# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json files to the working directory first (better for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start the Vite development server and allow access from outside the container
CMD ["npm", "run", "dev", "--", "--host"]