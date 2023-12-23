from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import json
import sqlite3

app = Flask(__name__)
CORS(app)

# Read the JSON file
with open('data.json', 'r') as file:
    data = json.load(file)

# Establish a connection to the SQLite database
conn = sqlite3.connect('my_database.db')
cursor = conn.cursor()

# Insert data into the SQLite table from JSON file
for item in data:
    # Check if key exists, if not, set a default value or handle as needed
    is_shortlisted = item.get('isshortlist', 'default_value')  # Replace 'default_value' as per your need
    # Similarly, do this for other keys that might be missing

    cursor.execute('INSERT INTO your_table (id, isshortlist, name, projects, years, price, path) VALUES (?, ?, ?, ?, ?, ?, ?)',
                   (item['id'], is_shortlisted, item['name'], item['projects'], item['years'], item['price'], item['path']))
# Commit changes
conn.commit()

# Close connection
conn.close()

# Define your Flask routes here
@app.route('/', methods=['GET'])
def root():
    return {"message": "Welcome to the API!"}

# Endpoint to serve the JSON data
@app.route('/data', methods=['GET'])
def get_data():
    return jsonify(data)

@app.route('/index.html')
def index():
    return send_from_directory('', 'index.html')

@app.route('/index.js')
def get_js():
    return send_from_directory('', 'index.js')

@app.route('/style.css')
def get_css():
    return send_from_directory('', 'style.css')

@app.route('/data.json')
def get_json():
    return send_from_directory('', 'data.json')

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory('assets', filename)

if __name__ == '__main__':
    app.run(debug=True)
