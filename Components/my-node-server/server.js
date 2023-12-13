const express = require('express');
const bodyParser = require('body-parser');
const emailjs = require('emailjs-com');

const app = express();
const port = 3000; // Use the port you prefer

app.use(bodyParser.json());

// Handle GET requests on the root path
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});

app.post('/sendEmail', async (req, res) => {
  try {
    const { data } = req.body;

    // Perform any necessary data validation and transformation

    // Send email using EmailJS
    const response = await emailjs.send(
      'service_apbvlr9',
      'template_5km7gge',
      data,
      'KlRB•••••••••••••••••'
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
