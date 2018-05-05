# node-pong

## Summary

Every time a developer wants to check if a site/API is up and running, usually a PING is made on a IP and PORT. Sometimes I want to check if my service is up on a determined PORT, or even if my request is going through the firewall/router/switch the way I expect.

So I wanted to have a simple project that I'm able to quick use it for testing purposes.

**``This is a simple project that provides API endpoints that answers to HTTP requests.``**

## Project Name

The name is simply inspired on the PING-PONG interaction, NOT on the PONG Game!

## Install

```bash
npm install node-pong
```

## Use

Create a Node.js (e.g. nodePongTest.js) file and insert:

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

and you should see the server running:

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

## Configuration file

On version 1.1.0 a configuration file was added. You can copy it from the ``node_modules/node-pong`` directory, or create it manually:

### node-pong.json

```json
{
    "_comment": "##########################\n\nThis is the configuration file for node-pong.\n\nports: array of ports for node-pong listen to. If no port is informed, or no node-pong.json file is found, it will listen on the default port 13420.\n\nserverMessage: should be a message that is shown on the console when the server is listening on the desired port, on the form of:\n\nserverMessage: port\n\n##########################\n",
    "ports": ["13420", "4500", "4600-4602"],
    "serverMessage": "The server is running on port: "
}
```

- ``_comment``: The message you want to show on the console;
- ``ports``: An array of ports that the server must listen to.
  - You can specify one by one or a range of ports;
  - Range will not check if the ``startPort`` is bigger than the ``endPort``, so you must supply the range in the correct order. E.g.: 
    - **correct: 10-20**;
    - <s>**wrong: 20-10**;</s>
  - NaN will just throw a "``-> not a valid port``" message on the console, but will not throw any error or interrupt other listening ports;
- ``serverMessage``: The message shown in the console when the server is started. It'll be one for each listened port;

**``NOTE1``**: If no configuration file is found or if the name is not correct (``node-pong.json``), than the server will be started just like on version 1.0.0, listening on the default port ``13420``.

**``NOTE2``**: As of one of my goals it to have the fewer dependencies possible, I opted for use the configuration file in json format, not on YAML or any other.

## Goals

Provide a simple API able to answer to HTTP requests, enabling our project to:

- <s>Provide a default API endpoint "/ping" on a predefined default port;</s>
- <s>Respond to ping requests on a default port;</s>
- <s>Respond with a default answer "PONG";</s>
- <s>Fewer dependencies as possible or no dependencies at all</s>
- Implement in-memory list of ports, with or without file persistence, for dynamic project configuration;
- <s>OPTIONAL: respond to ping requests on several ports;</s>
- OPTIONAL: respond with a customized answer on the default port;
- OPTIONAL: respond with a customized answer on several different ports;

## TODO

- Implement every OPTIONAL goal described above;
- Create tests using Mocha or another framework;
- Implement a continuous delivery process;

## Versions

### 1.1.1

- Goals updated - added dynamic port configuration wish;
- Added more keywords for the package;

### 1.1.0

- Added the ability of listening on multiple ports;
- Added the ability of custom "server running" message;

### 1.0.1

- Fixing README and deploy error;

### 1.0.0

- It's the MVP for this package;
- Simplest implementation ever;
- no dependencies;
- no logs;
- no tests;
- no parameters for start listening on a different port;
