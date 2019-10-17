const express = require('express');
var cors = require('cors');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');


const app = express();
app.use(cors());


// Bodyparser Middleware
// this parses the request body to be a readable json format
app.use(express.json());


// Connect to Mongo DB
const db = config.get('mongoURI');
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// Routes
app.use('/api', require('./routers/test.router'));
// app.use('/api/admin', adminRoutes);


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


// launch our backend into a port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));