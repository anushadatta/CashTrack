const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb+srv://mehul:fruitloops@cash-track.ghuam.mongodb.net/cash-track?retryWrites=true&w=majority";

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('test');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};