const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

// create express app
const app = express();
// Setup server port
// const port = process.env.PORT || 8070;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors())

// define a root route
app.get('/', (req, res) => {
  res.send("Welcome to Node_js ");
});


const userrouter = require('./router/router');

app.use('/', userrouter);



app.listen(8080, () => {
  console.log(`Server is listening on port `);
});