const express = require("express");
const https = require("https");
const router = express.Router();

router.get("/", (req, res) => {
    let o = { format: "urls" };
    let bodyString = JSON.stringify(o);

    let options = {
        host: "global.xirsys.net",
        path: "/_turn/fmcwebrtc",
        method: "PUT",
        headers: {
            "Authorization": "Basic " + Buffer.from("trungdzlhp123:ab5889d2-cfc0-11ef-adb4-0242ac130002").toString("base64"),
            "Content-Type": "application/json",
            "Content-Length": bodyString.length,
        },
    };

    let httpreq = https.request(options, (httpres) => {
        let str = "";
        httpres.on("data", (data) => (str += data));
        httpres.on("end", () => {
            const response = JSON.parse(str);
            res.json(response.v.iceServers);
        });
    });

    httpreq.on("error", (e) => {
        console.log("request error:", e);
        res.status(500).send("Error fetching ICE servers");
    });

    httpreq.write(bodyString);
    httpreq.end();
});

module.exports = router;