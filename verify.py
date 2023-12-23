import sqlite3

# Connect to the database
conn = sqlite3.connect('my_database.db')

# Create a cursor object
cursor = conn.cursor()

# Execute SQL commands
cursor.execute('SELECT * FROM your_table')
rows = cursor.fetchall()

# Print or process fetched data
for row in rows:
    print(row)

# Close the connection
conn.close()
