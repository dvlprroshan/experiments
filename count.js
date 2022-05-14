var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:4321/";
// var url = "mongodb://localhost:27017/";


MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    
    const old_time = Date.now();

    console.log('Token count: ' + await dbo.collection("tokens").countDocuments());

    console.log('Time Taken: ' + (Date.now() - old_time) / 1000 + ' seconds');
    
    db.close();
});