const express = require('express');
const app = express();

// Use dynamic port or fallback to 5002
const PORT = process.env.PORT || 5051;

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); // Add JSON parsing middleware

app.post('/payment-success', (req, res) => {
  try {
    // More robust logging
    console.log('Payment Response Received:', JSON.stringify(req.body, null, 2));

    // Redirect to production site
    res.redirect('https://www.thefost.com/');
  } catch (error) {
    console.error('Error processing payment success:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add error handling for undefined routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Improved server startup logging
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;