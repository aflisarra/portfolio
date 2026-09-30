require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRoute = require('./Routes/contactRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONT_URL || 'http://localhost:4200' }));
app.use(express.json({ limit: '20kb' }));

app.get('/', (req, res) => {
  res.send('Hello World !');
});

app.use('/api/contact', contactRoute);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
