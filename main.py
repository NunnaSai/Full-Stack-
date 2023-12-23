from flask import Flask, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Read the JSON file
with open('data.json', 'r') as file:
    data = json.load(file)
@app.route('/',methods=['GET'])
def root():
    return {"message": "Welcome to the API!"}
# Endpoint to serve the JSON data
@app.route('/data', methods=['GET'])
def get_data():
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)  # Run the server