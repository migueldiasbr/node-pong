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
let fs = require('fs');
let defaultPort = 13420;
/*load configFile from app dir, using normalize for windows/linux/mac path correction */
let configFile = require('path').normalize(process.cwd() + '/' + 'node-pong.json');


/**
 * If there is a node-pong.json file, we will run the server with it's configurations
 * if it does not exists, run with default port 13420
 */
if (fs.existsSync(configFile)) { //run with config file details
    const config = require(configFile);
    console.log(configFile);
    const ports = config.ports;
    const serverMessage = config.serverMessage;
    let startedServers = 0;
    if (config._comment.trim().length > 0)
        console.log(config._comment);
    for (const key in ports) {
        if (ports[key].indexOf('-') > 0) { //check for range like: 10000-10030
            let portsArray = ports[key].split('-');
            let startPort = portsArray[0].trim();
            let endPort = portsArray[1].trim();
            if (isNumber(startPort) && isNumber(endPort)) { //only runs if the ports are numbers
                for (let index = startPort; index < endPort; index++) {
                    createServer(serverMessage, index);
                    startedServers++;
                }
            } else {
                console.log(ports[key] + ' -> not a valid port');
            }
        } else { //single port
            let singlePort = ports[key].trim();
            if (isNumber(singlePort)) {
                createServer(serverMessage, singlePort);
                startedServers++;
            } else
                console.log(singlePort + ' -> not a valid port');
        }
    }
    //If for any reasons no server was created with the configuration file, start a default server...
    if (startedServers === 0) {
        console.log('Something went wrong with the configuration file...\nStarting a default server\n');
        createDefaultServer();
    }
} else { //run default server if no configuration file is found
    createDefaultServer();
}

/**
 * Create a server listening on the defaultPort
 */
function createDefaultServer() {
    createServer('server running on port: ', defaultPort);
}

/**
 * Process the server requests
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
function processServer(req, res) {
    if (req.url === '/ping') {
        res.write('pong');
        //        res.write('Response from port: ' + port);
        res.end();
    }
}

/**
 * Create a new HTTP server listening on the given PORT
 * 
 * @param {String} serverMessage 
 * @param {Integer} port 
 */
function createServer(serverMessage, port) {
    http.createServer(processServer).listen(port);
    console.log(serverMessage + port);
}

/**
 * Check if N it is a number
 * Solution got on: https://stackoverflow.com/questions/1303646/check-whether-variable-is-number-or-string-in-javascript
 * 
 * @param {Number} n 
 */
function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}