FROM node:20-alpine

WORKDIR /app

# Copy all files first
COPY . .

# Install all dependencies including devDependencies
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
