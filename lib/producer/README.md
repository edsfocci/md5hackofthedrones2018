# Producer Automated Loading

Setup up a basic service that is pushing to the data to the broker.
Data will be basic json data containing a randomly selected longitude, latitude and binary output of {0,1}.

## Example message to broker
```json
{
	"latitude": 23.123,
	"longitude": -93.123
	"droneDetected": true
}```

