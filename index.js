const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();

// Multer configuration to store files in the 'uploads' folder
const upload = multer({
  dest: './uploads/',
  limits: {
    fileSize: 1024 * 1024, // 1MB file size limit
  },
});

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Carms@20', // Update password as per your configuration
  port: 5432,
});

// Endpoint to handle CSV file upload
app.post('/upload', upload.single('file'), (req, res) => {
  // Check if the file is provided
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.resolve(req.file.path); // Path to the uploaded CSV file
  const results = [];

  // Read and parse the CSV file
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      // Push each row (name, age, country) to the results array
      results.push([row.column1, row.column2, row.column3]);
    })
    .on('end', () => {
      // Loop through the results array and insert each row into the database
      results.forEach((user) => {
        const query = {
          text: 'INSERT INTO users (name, age, country) VALUES ($1, $2, $3);',
          values: user,
        };
        pool.query(query, (err) => {
          if (err) {
            console.error('Error inserting data:', err);
          } else {
            console.log('Data inserted successfully');
          }
        });
      });

      // Delete the uploaded file after processing
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('Uploaded file deleted');
        }
      });

      res.send('CSV file processed and data inserted!');
    })
    .on('error', (err) => {
      console.error('Error reading CSV file:', err);
      res.status(500).send('Error reading CSV file');
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
