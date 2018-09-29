#!/usr/bin/python

""" producer.py
Publish JSON data to the kafka broker every minute.
Three topics will be created
	1. sensors - all data
	2. sensorTrue - all true data
	3. sensorFalse - all false data

Multiple topics for UI debugging
"""
import json
import sys

from kafka import KafkaClient, KafkaProducer
from kafka.errors import KafkaUnavailableError


if __name__ == '__main__':
	# URI to EC2
	uri = "ec2-54-210-97-60.compute-1.amazonaws.com:9092"	

	# Create kafka client for topic generation
	print('Client connecting')
	try:
		client = KafkaClient(hosts=[uri])
	except KafkaUnavailableError as e:
		print('Kafka client unavailable')
		print(e)
		sys.exit()

	# Create publisher object
	print('Producer connecting')
	try:
		producer = KafkaProducer(bootstrap_servers=[uri],
				acks=1,
				batch_size=1,
				retries=1,
				value_serializer=lambda m: json.dumps(m).encode('ascii'),
				api_version=(0,10))
	except KafkaUnavailableError as e:
		print('Kafka producer unavailable')
		print(e)
		sys.exit()

	# Pull get the random data
	print('Getting data')
	# Publish to topic
	print('Pushing data')
