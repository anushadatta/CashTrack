// mongodb driver
const MongoClient = require("mongodb").MongoClient;
const dbConnectionUrl = "mongodb+srv://mehul:fruitloops@cash-track.ghuam.mongodb.net/cash-track?retryWrites=true&w=majority";
var dbInstance;

function initialize(
    dbName
) {

}

const db = MongoClient.connect(dbConnectionUrl, function(err, dbInstance) {
                if (err) {
                    console.log(`[MongoDB connection] ERROR: ${err}`);
                    // failureCallback(err); // this should be "caught" by the calling function
                } else {
                    const dbObject = dbInstance.db('test');
                    // const dbCollections = dbObject.listCollections();
                    console.log("[MongoDB connection] SUCCESS", dbObject);
                    
                    return dbObject;
                }
            });


module.exports = db;