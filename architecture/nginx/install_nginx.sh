#!/bin/bash

# install nginx on ubuntu 16.04
# Non bloacking high concurrency webserver


# 1. Install Nginx
# 2. Adjusting the firewall
# 3. Check the web server
# 4. Managing the Nginx process
# 5. Setting up server blocks


# 0. sudo check
if [ ${EUID} -ne 0 ]; then
	echo "Usage: sudo install_nginx.sh"
	exit 0
fi

# 1. Installing nGinx
sudo apt update
sudo apt install nginx

# 2. Adjusting the firewall
# Fire wallmust be adjusted to allow access to the service.
# Nginx registers itself as a service with `ufw` upon
# intallation

# List the application configurations
# sudo ufw app list

# Allow traffic on port 80
sudo ufw allow 'Nginx HTTP'

# 3. Checking the web server
# Post installation, nginx should be immediately availabile
sudo systemctl status nginx

# 4. Managing the Nginx Process
# Stopping the service
#sudo systemctl stop nginx

# Start the service
#sudo systemctl start nginx

# Restart the service
#sudo systemctl restart nginx

# Reloading for configuration changes.
# Configuration changes can be done without dropping connections
#sudo systemctl reload nginx

# Stopping restart on server reboot
# Nginx is configured to restart at server startup.
# Disable if not desired behaviour.
#sudo system disable nginx

# Re-enable
#sudo systemctl enable nginx

