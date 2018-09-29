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
import random
import time

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
    assert(type(center) is dict)
    assert('lat' in center.keys())
    assert('lon' in center.keys())

    center_lat = center.get('lat')
    center_lon = center.get('lon')
    assert(center_lat is not None)
    assert(center_lon is not None)

    # Create the shifts
    min_lat = center_lat - shift
    max_lat = center_lat + shift
    min_lon = center_lon - shift
    max_lon = center_lon + shift
    return dict(min_lat=min_lat, max_lat=max_lat, min_lon=min_lon, max_lon=max_lon)


def get_multiple_points(bounds, num_points=10):
    assert(type(bounds) is dict)
    lons = (random.uniform(bounds.get('min_lon'), bounds.get('max_lon'))
            for _ in range(num_points))
    lats = (random.uniform(bounds.get('min_lat'), bounds.get('max_lat'))
            for _ in range(num_points))
    drone_detected = (random.choice([0, 1]) for _ in range(num_points))

    return (dict(lon=lon, lat=lat, isDrone=detect) for lon, lat, detect in zip(lons, lats, drone_detected))


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
    bounds = get_bounds(AUSTIN_LAT_LONG)

	client.ensure_topic_exists('sensors')
	client.ensure_topic_exists('drone')
	client.ensure_topic_exists('nodrone')

	# Run the service and push the data
	for _ in range(9):
		# Get some random points
		points = get_multiple_points(bounds)
		for point in points:
			
			# Send all values 
			producer.send('sensors', value=point)

			# Send only true values
			if point.get('isDrone'):
				producer.send('drone', value=point)
				
			# Send only false values
			if not point.get('isDrone'):
				producer.send('nodrone', value=point)
		
		time.sleep(5)
    
	sys.exit()