import json
import base64
import uuid
from flask import Flask, render_template, request, make_response, jsonify
#from flask_socketio import SocketIO
from dejavu import Dejavu
from dejavu.recognize import FileRecognizer

# Load dejavu config object
with open('dejavu.cnf') as f:
    config = json.load(f)

app = Flask(__name__)
#socketio = SocketIO(app)
djv = Dejavu(config)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/classify', methods=['POST'])
def classify():
    
    audio = dict(request.files).get('audio')[0]
    #print audio
    #return ''
    salt = str(uuid.uuid1())
    filepath = '{}-audio.wav'.format(salt)
    with open(filepath, 'wb') as fout:
        audio.save(fout)
    
    noise_or_drone = djv.recognize(FileRecognizer, filepath).get('song_name')
    
    is_drone = 1 if 'drone' in noise_or_drone else 0

    return make_response(jsonify({'isDrone': is_drone}))


# @socketio.on('client_connected')
# def show_connected(message):
#     print message

# @socketio.on('raw')
# def fingerprint(raw):
#     noise_or_drone = djv.recognize(FileRecognizer, )

if __name__ == '__main__':
    #socketio.run(app, host='127.0.0.1', port=5000, log_output=True)
    app.run(host='0.0.0.0', port=5000, debug=True)

