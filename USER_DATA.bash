#!/bin/bash

# Update and upgrade the packages
sudo yum update -y && sudo yum upgrade -y

# Install necessary packages
sudo yum install -y git
sudo yum install -y nodejs npm

# Install pm2 globally using npm
sudo npm install pm2 -g

# Clone the repository to the home directory
git clone -b main https://github.com/krittamark-u/CS100-Project-G11.git ~/cs100_g11

# Install dependencies
cd ~/cs100_g11/backend && sudo npm install

# Start the application using pm2
sudo pm2 start server.js
sudo pm2 save
sudo pm2 startup

# Install nginx
sudo yum install -y nginx
sudo systemctl start nginx && sudo systemctl enable nginx

# Copy the nginx content and configuration file
sudo cp -r ~/cs100_g11/html/ /usr/share/nginx/
sudo cp ~/cs100_g11/nginx.conf /etc/nginx/nginx.conf

# Reload nginx configuration
sudo nginx -s reload