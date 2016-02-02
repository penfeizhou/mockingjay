/**
 * Created by pengfei on 16/2/1.
 */
var express = require('express');
var uuid = require('node-uuid');
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
    var options = {
        hostname: urlP.hostname,
        port: urlP.port,
        path: urlP.path,
        method: req.method,
        headers: headers
    };
    var sessionid = req.query.sessionid;
    var msg = {};
    msg.method = req.method;
    msg.url = req.query.url;
    msg.status = 'Pending';
    msg.data = {};
    msg.uuid = uuid.v1();
    msg.time = new Date().getTime();
    msg.requestHeaders = req.headers;
    var callback = function (obj) {
        msg.data = obj;
        websocket.instance().emit('message:' + sessionid, msg);
    };
    callback();
    var req2 = http.request(options, function (res2) {
        msg.responsHeaders = res2.headers;
        msg.statusCode = res2.statusCode;
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

            msg.status = 'Done ';
            msg.cost = new Date().getTime() - msg.time;
            var buffer = Buffer.concat(chunks);
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
                msg.status = 'Uploading';
                callback();
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
        msg.status = 'Error';
        msg.cost = new Date().getTime() - timestamp;
        msg.data = e.stack.toString();
        callback();
    });
};

router.get('/', handler);
router.post('/', handler);
router.put('/', handler);
router.delete('/', handler);

module.exports = router;