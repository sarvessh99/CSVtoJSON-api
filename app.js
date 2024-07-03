const express = require('express');
const dotenv = require('dotenv');
const config = require('config');
const { uploadCSV } = require('./controllers/csvController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || config.get('port');

app.get('/upload-csv', uploadCSV);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
