from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def fetch_data_from_db():
    conn = sqlite3.connect('newdatabase3.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM your_table")  # Update 'your_table' to your actual table name
    columns = [column[0] for column in cursor.description]  # Get column names
    data = cursor.fetchall()
    conn.close()

    # Convert fetched data to a list of dictionaries with column names as keys
    return [dict(zip(columns, row)) for row in data]

@app.route('/', methods=['GET'])
def root():
    return {"message": "Welcome to the API!"}

@app.route('/data', methods=['GET'])
def get_data():
    data_from_db = fetch_data_from_db()
    return jsonify(data_from_db)

if __name__ == '__main__':
    app.run(debug=True)
