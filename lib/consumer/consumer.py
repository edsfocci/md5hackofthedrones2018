from kafka import KafkaConsumer

print('Connecting to client')
consumer = KafkaConsumer('sensors', 
    group_id='test', 
    bootstrap_servers=['ec2-54-236-152-162.compute-1.amazonaws.com:9092'])

print('Getting messages')
consumer.subscribe('sensors')
for msg in consumer:
    print(msg.value.decode('utf-8'))

print('All done')