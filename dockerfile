# Use the base image appropriate for your app's stack
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy your app's files into the container
COPY . /usr/src/app

# Install dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3001

# Command to start your app
CMD ["npm", "start"]
