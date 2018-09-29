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

# Centeral point
AUSTIN_LAT_LONG = dict(lat=30.267153, lon=-97.743057)

# Build a bounding box for selection
def get_bounds(center, shift=1.0):
    	"""Take a dictionary with lat, lon and create the min/max for
		both lat and long
		
		@shift: float value to shift from center
		
		Returns dict of min,max lat and lon
		"""
		assert(typeof(center) is dict)
		assert('lat' in center.keys())
		assert('lon' in center.keys())

		center_lat = center.get('lat')
		center_lon = center.get('lon')
		assert(center_lat is not None)
		assert(center_lon is not None)

		min_lat = center_lat - shift
		max_lat = center_lat + shift

		min_lon = center_lon - shift
		max_lon = center_lon + shift

		return dict(min_lat=min_lat, max_lat=max_lat, min_lon=min_lon, max_lon=max_lon)



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
		producer = KafkaProducer(bootstrap_servers=uri,
				acks=1,
				batch_size=1,
				retries=1,
				value_serializer=lambda m: json.dumps(m).encode('ascii'))

	except KafkaUnavailableError as e:
		print('Kafka producer unavailable')
		print(e)
		sys.exit()

	# Pull get the random data
	print('Getting data')
	# Publish to topic
	print('Pushing data')
