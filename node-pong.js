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
let urlMod = require('url');
let portArray = ['13420'];
let httpServers = [];
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
    if (config._comment.trim().length > 0) {
        console.log(config._comment);
    }
    for (const key in ports) {
        if (ports[key].indexOf('-') > 0) { //check for range like: 10000-10030
            let portsArray = ports[key].split('-');
            let startPort = portsArray[0].trim();
            let endPort = portsArray[1].trim();
            if (isNumber(startPort) && isNumber(endPort)) { //only runs if the ports are numbers
                for (let index = startPort; index <= endPort; index++) {
                    createServer(serverMessage, index);
                    addPort('' + index); //convert number
                    startedServers++;
                }
            } else {
                console.log(ports[key] + ' -> not a valid port');
            }
        } else { //single port
            let singlePort = ports[key].trim();
            if (isNumber(singlePort)) {
                createServer(serverMessage, singlePort);
                addPort(singlePort);
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
 * add port to the array of ports the server is listening to
 * 
 * @param {any} port 
 */
function addPort(port) {
    if (portArray.indexOf(port) === -1) {
        portArray.push(port);
    }
}

/**
 * Create a server listening on the defaultPort
 */
function createDefaultServer() {
    //createServer('server running on port: ', defaultPort);
    createServer('server running on port: ', portArray[0]);
}

/**
 * Process the server requests and returns a response based on this precedence:
 * 
 * HTTP ACCEPT HEADERS - we want just one kind of response, so if multiple ACCEPT headers 
 * are found, the first one on the following sequence will be the response:
 *   - JSON
 *   - HTML
 *   - XML
 * 
 * If no header is identified or is incorrect, the plain answer "pong" will be given.
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
function processServer(req, res) {
    const { headers, method, url } = req;
    let parameters = urlMod.parse(req.url, true).query;
    let host = req.headers.host;
    let accept = req.headers.accept;
    if (typeof accept === 'undefined')
        accept = 'text/plain';
    if (req.url.indexOf('/ping') > -1) {
        //console.log(parameters);
        res.setHeader('Accept-Charset', 'utf-8');
        res.setHeader('endpoint', '/ping');
        //Check the type of response the client needs        
        if (accept.indexOf('application/json') > -1) {
            //valid json - https://jsonlint.com/
            let body = '{"answer": "pong"}';
            let responseBody = { headers, method, url, body };
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(responseBody));
        } else if (accept.indexOf('text/html') > -1) {
            //valid HTML - http://validator.w3.org
            res.setHeader('Content-Type', 'text/html');
            res.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>node-pong response</title></head><body><h1>pong</h1></body></html>');
        } else if (accept.indexOf('application/xml') > -1) {
            //valid XML - http://validator.w3.org
            res.setHeader('Content-Type', 'application/xml');
            res.write('<?xml version="1.0" encoding="utf-8" ?><answer>pong</answer>');
        } else { //default answer if no type is specified or not defined correctly
            res.writeHead(200, { 'Content-Type': 'text/plain' }); //writeHead must be called latest
            res.write('pong');
        }
        res.end();
    }
    if (req.url === '/ports') {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('endpoint', '/ports');
        res.end(JSON.stringify(portArray));
    }
}

/**
 * Create a new HTTP server listening on the given PORT
 * 
 * @param {String} serverMessage 
 * @param {Integer} port 
 */
function createServer(serverMessage, port) {
    let server = http.createServer(processServer).listen(port);
    httpServers.push(server);
    console.log(serverMessage + port);
}

/**
 * Closes every single HTTP server created.
 * 
 * @param {any} done 
 */
function close(done) {
    httpServers.forEach(server => {
        server.close(done);
    });
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

module.exports.close = close;