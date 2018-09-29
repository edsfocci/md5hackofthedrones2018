#!/bin/bash

# Get directory from command line
DIR=$1
if [ ! -d "${1}" ]; then
	echo "USAGE: convert_mp3_to_wav.sh /path/to/mp3"
	exit 0
fi


# Convert all the mp3s in the directory to wavs
for mp3file in $(find $1 --name "*mp3"); 
do
	# mpg123 -waveoutput nameofoutput targetfile
	mpg123 -w $mp3file.wav $mp3file
done
