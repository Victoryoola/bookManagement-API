const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/book');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(logger);

app.use('/api/books', bookRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});