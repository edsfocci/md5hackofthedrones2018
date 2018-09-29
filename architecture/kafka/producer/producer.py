#!/usr/bin/python

""" producer.py
Publish JSON data to the kafka broker every minute.
Three topics will be created
	1. sensors - all data
	2. sensorTrue - all true data
	3. sensorFalse - all false data

Multiple topics for UI debugging
"""
from kafka import KafkaClient, Producer
from kafka.errors import KafkaUnavailableError


if __name__ == '__main__':
	# URI to EC2
	uri = "54.210.97.60:9092"	

	# Create kafka client for topic generation
	try:

	except KafkaUnavailableError as e:
		print('Kafka client unavailable')
		sys.exit()
	# Create publisher object

	# Pull get the random data

	# Publish to topic

