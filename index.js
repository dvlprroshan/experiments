var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:4321/";
// var url = "mongodb://localhost:27017/";

// get random string
function _getRandomString(length) {
    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


// get random ip
function getRandomIp() {
    var ip = "";
    for (var i = 0; i < 4; i++) ip += Math.floor(Math.random() * 255) + ".";
    return ip.substring(0, ip.length - 1);
}

// get random state of india
function getRandomStateOfIndia() {
    let state = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
    ];
    return state[Math.floor(Math.random() * state.length)];
}

MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    for (let j = 0; j < 100; j++) {
        let tokens = [];
        for (let i = 0; i < 10000; i++) {
            tokens.push({
                domain_id: 1,
                token: getRandomString(120),
                version: 2,
                ip: getRandomIp(),
                country: "India",
                state: getRandomStateOfIndia(),
                browser_name: "Chrome",
                operating_system: "Windows",
                platform: "Desktop",
            });
        }

        // insert all tokens to tokens collection
        await dbo.collection("tokens").insertMany(tokens);
        console.log(j);
    }

    db.close();
});
