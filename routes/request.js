/**
 * Created by pengfei on 16/2/1.
 */
var express = require('express');
var router = express.Router();
//url=?&sessionid=?
var http = require('http');
var URL = require('url');
var websocket = require('../websocket')
var zlib = require('zlib');

var handler = function (req, res, next) {
    var urlP = URL.parse(req.query.url);
    var headers = {};
    for (var i in req.headers) {
        if (!/host|connection/i.test(i)) {
            headers[i] = req.headers[i];
        }
    }
    var bodyString = JSON.stringify(req.body);
    var options = {
        hostname: urlP.hostname,
        port: urlP.port,
        path: urlP.path,
        method: req.method,
        headers: headers
    };
    var sessionid = req.query.sessionid;
    var req2 = http.request(options, function (res2) {
        res.writeHead(res2.statusCode, res2.headers);
        res2.pipe(res);
        var chunks = [], encoding = res2.headers['content-encoding'];
        if (encoding === 'undefined') {
            res.setEncoding('utf-8');
        }
        res2.on('data', function (data) {
            chunks.push(data);
        });
        res2.on('end', function () {
            var buffer = Buffer.concat(chunks);
            var callback = function (data) {
                var obj = {};
                obj.method = req.method;
                obj.url = req.query.url;
                obj.headers = res2.headers;
                obj.data = data;
                console.log("request " + req.query.url + " data:" + data);
                websocket.instance().emit('message:' + sessionid, obj);
            }
            if (encoding == 'gzip') {
                zlib.gunzip(buffer, function (err, decoded) {
                    data = decoded.toString();
                    callback(data);
                });
            } else if (encoding == 'deflate') {
                zlib.inflate(buffer, function (err, decoded) {
                    data = decoded.toString();
                    callback(data);
                });
            } else {
                data = buffer.toString();
                callback(data);
            }


        });
    });
    if (/POST|PUT/i.test(req.method)) {
        if (req.headers['content-type'] &&
            req.headers['content-type'].indexOf('multipart/form-data') === 0 &&
            (req.method === 'POST' || req.method === 'PUT')) {
            req.on('data', function (data) {
                req2.write(data);
            });
            req.on('end', function () {
                req2.end();
            });
        } else {
            req2.write(req.rawBody);
        }
    } else {
        req2.end();
    }
    req2.on('error', function (e) {
        console.log("request " + req.query.url + " error:" + e.message);
        res.end(e.stack);
    });
};

router.get('/', handler);
router.post('/', handler);
router.put('/', handler);
router.delete('/', handler);

module.exports = router;