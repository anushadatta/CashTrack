const express = require("express");
const server = express();
var mongoUtil = require( './mongoUtil' );

const bodyParser = require("body-parser");

const bills = require('./routes/Bills');
const users = require('./routes/Users');

mongoUtil.connectToServer( function( err, client ) {
  if (err) console.log(err);
  // start the rest of your app here
  else console.log("Connected to Mongo!");
} );

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(express.static('public'));

const port = 3000;

server.use('/api/bills', bills);
server.use('/api/users', users);

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

