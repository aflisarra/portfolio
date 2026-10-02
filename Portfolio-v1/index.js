require('dotenv').config();

const express = require('express');
const cors = require('cors');
const contactRoute = require('./Routes/contactRoute');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONT_URL || 'http://localhost:4200'
  })
);

app.use(express.json({ limit: '20kb' }));

app.get('/', (req, res) => {
  res.send('Portfolio backend is running!');
});

app.use('/api/contact', contactRoute);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});