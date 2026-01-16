# Use Node.js image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy Vue project files
COPY . .

# Install npm dependencies
RUN npm install

# Expose Vite dev server port
EXPOSE 5173

# Start Vue development server (accessible from host)
CMD ["npm", "run", "dev", "--", "--host"]