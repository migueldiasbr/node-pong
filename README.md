---
Goal1: 'Add this project to npm repository'
Goal1-text: ''' Install by entering ```npm install node-pong``` into your terminal.
'''
---
# node-pong

## Summary

Everytime a developer wants to know if a site/API is up and running, generally a PING is made on a IP and PORT. Sometimes I want to check if my service is up on a determined PORT, or even if my request is going through the firewall/router/switch the way I expect.

So I wanted to have a simple project that I'm able to quick use it for testing purposes.

This is a simple project that provides API endpoints that answers to HTTP requests.

## Install & Run

Download this repository

```terminal
git clone https://github.com/migueldiasbr/node-pong.git
```

Run the server

```terminal
node node-pong.js
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
