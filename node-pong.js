/**
 * node-pong.js
 * https://github.com/migueldiasbr/node-pong
 *
 * @description A simple API able to answer to HTTP requests
 * @author Miguel Dias
 * 
 * Copyright 2018+ Miguel Dias
 * Released under the MIT license
 */

"use strict";

let http = require('http');
let defaultPort = 13420;

let server = http.createServer(function(req, res) {
    if (req.url === '/ping') {
        res.write('pong');
        res.end();
    }
});

server.listen(defaultPort);

console.log('server running on port %d', defaultPort);