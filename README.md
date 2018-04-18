# node-pong

## Summary

Everytime a developer wants to know if a site/API is up and running, generally a PING is made on a IP and PORT. Sometimes I want to check if my service is up on a determined PORT, or even if my request is going through the firewall/router/switch the way I expect.

So I wanted to have a simple project that I'm able to quick use it for testing purposes.

**``This is A simple project that provides API endpoints that answers to HTTP requests.``**

## Install

```bash
npm install node-pong
```

## Use

Create a Node.js file and insert:
```nodejs
let nodePong = require('node-pong');
```

or type this on your terminal:

```bash
echo "let nodePong = require('node-pong');">nodePongTest.js
```

## Run

```bash
node nodePongTest.js
```

and you whould see the server running:

```bash
server running on port 13420
```

## Check response

Now you only have to check if the server is responding using any language/program you want. Example:

```bash
curl http://localhost:13420/ping
```

and you should see a response (drum roll)

```bash
pong
```

## Project Name

The name is simply inspired on the PING-PONG interaction, NOT on the PONG Game!

## Goals

Provide a simple API able to answer to HTTP requests, enabling our project to:

- Provide a default API endpoint "/ping" on a predefined default port;
- Respond to ping requests on a default port;
- Respond with a default answer "PONG";
- OPTIONAL: respond to ping requests on several ports;
- OPTIONAL: respond with a customized answer on the default port;
- OPTIONAL: respond with a customized answer on several different ports;

## TODO

- Implement every OPTIONAL goal described above;
- Create tests using Mocha or another framework;
- Implement a continuous delivery process;

## Versions

### 1.0.0

- It's the MVP for this package;
- Simplest implementation ever;
- no dependencies;
- no logs;
- no tests;
- no parameters for start listening on a different port;
