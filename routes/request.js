/**
 * Created by pengfei on 16/2/1.
 */
var express = require('express');
var router = express.Router();
//url=?&sessionid=?
var http = require('http');
var URL = require('url');
router.get('/', function (req, res, next) {
    var urlP = URL.parse(req.query.url);
    var options = {
        hostname: urlP.hostname,
        port: urlP.port,
        path: urlP.path,
        method: req.method,
        headers: req.headers
    };
    var sessionid = req.query.sessionid;
    var req2 = http.request(options, function (res2) {
        res.writeHead(res2.statusCode, res2.headers);
        res2.pipe(res);
    });
    if (/POST|PUT/i.test(req.method)) {
        req.pipe(req2);
    } else {
        req2.end();
    }
    req2.on('error', function (e) {
        console.log("request req.query.url error: " + e.message);
        res.end(e.stack);
    });
});

module.exports = router;