
const https = require("https")


const SendNotification = async (data, cb) => {
    var headers = {
        "Content-Type": "application/json;charset=utf-8",
        "Authorization": "Basic " + process.env.APP_KEY,
    }
    const options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    const req = https.request(options, (res) => {
        res.on("data", (data) => {
            console.log(JSON.parse(data));

            return cb(null, JSON.parse(data))
        });
    });
    req.on("error", (e) => {
        return cb({
            message: e
        })
    });
    req.write(JSON.stringify(data));
    req.end();
}

module.exports={SendNotification}