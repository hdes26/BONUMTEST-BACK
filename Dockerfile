# Set the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the project source code to the container
COPY . .

# Ejecuta el script de construcción
RUN npm run build

# Establece el directorio de trabajo en /app/dist
WORKDIR /app/dist

# Expose the port on which the Express.js application runs
EXPOSE 12001

# Command to start the application
CMD [ "node", "app.js" ]