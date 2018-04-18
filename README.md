# node-pong

## Summary

Everytime a developer wants to know it a site/api is up and runnig, generally a PING is made on a IP and PORT. Sometimes I want to check if my service is up on a determined PORT, or even if my request is going throught the firewall/router/switch the way I expect.

So I wanted to have a simple project that I'm able to quick use it for testing purposes.

This is a simple project that provides endpoints that answers to HTTP requests.

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
