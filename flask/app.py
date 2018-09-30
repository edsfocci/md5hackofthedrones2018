import json
from flask import Flask, render_template
from flask_socketio import SocketIO
from dejavu import Dejavu
from dejavu.recognize import FileRecognizer

# Load dejavu config object
with open('dejavu.cnf') as f:
    config = json.load(f)

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('client_connected')
def show_connected(message):
    print(message)

@socketio.on('raw')
def fingerprint(raw):
    pass

if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', port=5000, log_output=True)


