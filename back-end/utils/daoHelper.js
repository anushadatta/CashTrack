var mongoUtil = require( '../mongoUtil' );

function sendSuccess(message, data = {}) {
    return {
      status: 200,
      msg: { success: true, message, data }
    };
}
  
function sendError(message, data = {}) {
    return {
      status: 600,
      msg: { success: false, message, data }
    };
}

async function getAll (collection, condition) {
    var db = mongoUtil.getDb();
    const getCollection = db.collection(collection);

    const queryResult = await getCollection.find(condition).toArray()
    .then(docs => {
        console.log("select result: ", docs);
        return docs;
    });

    return queryResult;
}

async function getOne (collection, condition) {
    var db = mongoUtil.getDb();
    const getCollection = db.collection(collection);

    const queryResult = await getCollection.findOne(condition)
    .then(docs => {
        console.log("select result: ", docs);
        return docs;
    });

    return queryResult;
}

async function updateOne (collection, filter, updateDocument) {
    var db = mongoUtil.getDb();
    const getCollection = db.collection(collection);

    const condition = {
        $set: updateDocument
    };

    const result = await getCollection.updateOne(filter, condition)
    .then(doc => {
        console.log("updateOne: ", doc);
        return doc;
    })
    .catch(error => {throw err});

    return result;
}

async function insertOne (collection, insertDocument) {
    var db = mongoUtil.getDb();
    const getCollection = db.collection(collection);

    const result = await getCollection.insertOne(insertDocument)
    .then(doc => {
        console.log(`inserted in ${collection}`);
        return doc;
    })
    .catch(error => {throw err});

    return result;

}

async function deleteOne(collection, condition) {
    var db = mongoUtil.getDb();
    const getCollection = db.collection(collection);

    const queryResult = await getCollection.deleteOne(condition)
    .then(docs => {
        console.log("select result: ", docs);
        return docs;
    })
    .catch(error => {throw error});

    return queryResult;
}

module.exports = {
sendSuccess,
sendError,
getAll,
getOne,
updateOne,
insertOne,
deleteOne
}
