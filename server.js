const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'your_database_name',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the MySQL database');
});

// Parse JSON requests
app.use(bodyParser.json());

// Define a route to handle product deletion
app.delete('/deleteProduct/:id', (req, res) => {
  const productId = req.params.id;

  const sql = `DELETE FROM products WHERE id = ?`;

  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete the product' });
      return;
    }

    console.log(`Deleted product with ID ${productId}`);
    res.sendStatus(204); // No Content (successful deletion)
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
