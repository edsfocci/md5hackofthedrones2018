#!/bin/bash
# Installation of Apache Kafka

### Step 0
# Verify sudo
if [ "$EUID" -ne 0 ]; then
	echo "Kafka installation must be run as root"
	exit
fi


### Step 1
# Kafka requires Java; jre 1.7>
apt update
apt install -y default-jre

### Step 2
# Install Zookeeper
# Zookeeper is a centralized service for maintaining
# configuration informatioon, naming, providing distributed synchronization, and providing group services.
# Kafa uses Zookeeper for maintaining heart beats of its nodes, 
# maintain configuration, and to elect leaders
apt install -y zookeeperd

### Step 3
# Create a service User for Kfaka
# Creating a non-sudo user specifically for Kafka minimizes the risk if
# the machine is compromised
adduser --system --no-create-home --disabled-password --disabled-login kafka

### Step 4
# Install Kafka
# Download, check integrity, install
wget "http://www-eu.apache.org/dist/kafka/1.0.1/kafka_2.12-1.0.1.tgz"
curl http://kafka.apache.org/KEYS | gpg --import
wget https://dist.apache.org/repos/dist/release/kafka/1.0.1/kafka_2.12-1.0.1.tgz.asc
gpg --verify kafka_2.12-1.0.1.tgz.asc kafka_2.12-1.0.1.tgz

### Step 5
# Extract download to new directory
mkdir /opt/kafka
tar -xvzf kafka_2.12-1.0.1.tgz --directory /opt/kafka --strip-components 1
rm -rf kafka_2.12-1.0.1.tgz kafka_2.12-1.0.1.tgz.asc

### Step 6
# Configuring Kafka server
# Data are persisted to the disk; create that directory
mkdir /var/lib/kafka
mkdir /var/lib/kafka/data

# Create backup of the server config properties
cp /opt/kafka/config/server.properties /opt/kafka/config/server.properties.bak
# Update the logging directory
sed -i 's/log.dirs.*/log\.dirs=\/var\/lib\/kafka\/data/' /opt/kafka/config/server.properties

### Step 7
# Ensure permission of directories
chown -R kafka:nogroup /opt/kafka
chown -R kafka:nogroup /var/lib/kafka

### Step 8
# Launching Kafka as a service on startup
# Create the service file
touch /etc/systemd/system/kafka.service
SERVICE=/etc/systemd/system/kafka.service
echo "[Unit]" >> ${SERVICE} 
echo 'Description=High-available, distributed message broker' >> ${SERVICE}
echo 'After=network.target' >> ${SERVICE}
echo '[Service]' >> ${SERVICE}
echo 'User=kafka' >> ${SERVICE}
echo 'ExecStart=/opt/kafka/bin/kafka-server-start.sh /opt/kafka/config/server.properties'  >> ${SERVICE}
echo '[Install]' >> ${SERVICE}
echo 'WantedBy=multi-user.target' >> ${SERVICE}

systemctl start kafka.service
systemctl enable kafka.service
systemctl status kafka.service
