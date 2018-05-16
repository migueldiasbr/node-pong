let assert = require('assert');
let http = require('http');
let nodePong = undefined;


describe('Endpoints tests', function() {
    describe('/ping', function() {
        it('plain text', function() {
            var headers = { 'Accept': 'text/plain' }
                //'Accept': 'text/html'
                //'Accept': 'application/json'
                //'Accept': 'application/xml'

            var options = {
                    host: 'localhost',
                    path: '/ping',
                    port: '13420',
                    //url: 'http://localhost:' + 13420 + '/ping',
                    method: 'GET',
                    headers: headers
                }
                //console.log('vai request');
            http.request(options, function(response) {
                //  console.log(options);
                var str = '';

                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function(chunk) {
                    str += chunk;
                });

                //the whole response has been recieved, so we just print it out here
                response.on('end', function() {
                    //console.log(str);
                    assert.equal(str.toString(), 'pong');
                });
            }).end();
        })
        it('json response', function() {
            var options = {
                host: 'localhost',
                path: '/ping',
                port: '13420',
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            }
            const req = http.request(options, (res) => {
                //var chunk = '';
                res.on('data', (chunk) => {
                    //console.log('TESTE' + chunk.toString());
                    //var temp = JSON.stringify(chunk.toString());
                    var temp = JSON.parse(chunk, true);
                    //console.log('TESTE2' + temp.body);
                    //console.log('TESTE3' + JSON.stringify(temp));

                    assert.equal(temp.body, '{"answer": "pong"}');
                    //assert.equal(chunk.body.answer, 'pong');
                });
            }).end();
        })
        it('html response', function() {
            var options = {
                host: 'localhost',
                path: '/ping',
                port: '13420',
                method: 'GET',
                headers: { 'Accept': 'text/html' }
            }
            const req = http.request(options, (res) => {
                res.on('data', (chunk) => {
                    assert.equal(chunk.toString(), '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>node-pong response</title></head><body><h1>pong</h1></body></html>');
                });
            }).end();
        })
        it('xml response', function() {
            var options = {
                host: 'localhost',
                path: '/ping',
                port: '13420',
                method: 'GET',
                headers: { 'Accept': 'application/xml' }
            }
            const req = http.request(options, (res) => {
                res.on('data', (chunk) => {
                    assert.equal(chunk.toString(), '<?xml version="1.0" encoding="utf-8" ?><answer>pong</answer>');
                });
            }).end();
        })
    })
    describe('/ports', function() {
        it('should get an array of ports', function() {
            //        const req = http.get('http://localhost:' + 13420 + '/ping', (res) => {//pode usar get tambem
            const req = http.request('http://localhost:' + 13420 + '/ports', (res) => {
                //console.log(JSON.stringify(res.headers));
                assert.equal(res.statusCode, 200);
            }).end();
        })
    })
});

before(function() {
    // runs before all tests in this block
    //console.log('before');
    console.log('Creating server...');
    nodePong = require('../node-pong');
});

beforeEach(function() {
    //console.log('beforeEach');
});


after(function() {
    //console.log('after');
    nodePong.close()
    console.log('Server closed...');
});

afterEach(function() {
    //console.log('afterEach');
});