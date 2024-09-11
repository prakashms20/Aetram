# Aetram
# CSV File Upload to PostgreSQL
This project is a simple Node.js application that allows users to upload a CSV file, processes the file, and inserts the data into a PostgreSQL database. The application uses Multer for handling file uploads and csv-parser for reading CSV files.

# Features
Upload a CSV file containing user data (name, age, country).
Parse the uploaded CSV file and insert its data into the PostgreSQL database.
Automatic file cleanup after processing.
Supports error handling for file uploads and database operations.

# Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js installed on your machine.
PostgreSQL database installed and running.
npm package manager installed.
Installation
Clone the repository or download the source code:

# bash
Copy code
git clone <repository-url>
cd <project-directory>
Install the required dependencies:

bash
Copy code
npm install
# Create a PostgreSQL database and a users table with the following structure:

sql
Copy code
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INTEGER,
    country VARCHAR(100)
);
# Update the PostgreSQL configuration in index.js with your database credentials:

javascript
Copy code
const pool = new Pool({
  user: 'your-db-username',
  host: 'localhost',
  database: 'your-database-name',
  password: 'your-db-password',
  port: 5432,
});
Usage
Start the server:

bash
Copy code
node index.js
The server will start on http://localhost:3000.

# Upload a CSV file:

Use Postman to make a POST request to http://localhost:3000/upload.
In the request body, select form-data and add a key file (type File) to upload the CSV.
The CSV file should follow this format:

csv
Copy code
column1,column2,column3
John,25,USA
Alice,30,UK
Bob,35,Australia
Once uploaded, the data will be inserted into the users table in your PostgreSQL database.

# Dependencies
Express - Web framework for Node.js.
Multer - Middleware for handling file uploads.
csv-parser - A streaming CSV parser for Node.js.
pg - PostgreSQL client for Node.js.
fs (File System) - File system module for file operations.
Error Handling
If the file is not provided, the server will respond with a 400 Bad Request status.
If there is any error while reading the CSV file or inserting data into PostgreSQL, the server will respond with a 500 Internal Server Error.
