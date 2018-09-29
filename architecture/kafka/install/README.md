# Kafka Broker Installation

## Configuration
- Ubuntu 16.04
- Zookeeper (port 2181)
- Kafka Broker (port 9092)

## Installation steps
1. `sudo ./apache_install_kafka.sh`
2. `sudo cp server.properties /opt/kafka/config`
3. `sudo systemctl restart kafka.service`

The `server.properties` file requires the public DNS or public IPv4 address to successfully run.
