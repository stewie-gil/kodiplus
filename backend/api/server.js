const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect('mongodb://localhost/todo-api',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
	console.log('connected to MongoDB');

    })
    .catch((error) => {
	console.error('Error connecting to MongoDB');
    });


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const apiRoutes = require('./routes/api');
// Set up APi routes as middleware



app.use('/api', apiRoutes);
