// This is our entry point to our API. Connects to the database and sets the routes
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3001;
const path = require('path');

app.use(express.json());

// enabling CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://kodiplus.cyclic.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// connect to our MongoDB Atlas
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// connect to the routes file
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'),
    function (err) {
      res.status(500).send(err);
    }

  );
});

// Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('listening for requests');
  });
});
