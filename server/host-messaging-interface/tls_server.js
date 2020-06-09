#!/usr/bin/env node
'use strict';

const tls = require('tls');
const fs = require('fs');
const host = 'localhost';
const port = 8000;

const options = {
    key: fs.readFileSync('certs/server/server.key'),
    cert: fs.readFileSync('certs/server/server.crt'),
    //ca: fs.readFileSync('certs/ca/ca.crt'), // authority chain for the clients
    //requestCert: true, // ask for a client cert
    //rejectUnauthorized: false, // act on unauthorized clients at the app level
};

var server = tls.createServer(options, (socket) => {
  socket.write('welcome!\n');
  socket.setEncoding('utf8');
  socket.pipe(socket);
})

.on('connection', function(c)
{
    console.log('insecure connection');
})

.on('secureConnection', function (c)
{
    // c.authorized will be true if the client cert presented validates with our CA
    console.log('secure connection; client authorized: ', c.authorized);
})

.listen(port, host, function() {
    console.log('TLS socket server listening on ' + host + ':' + port + '\n');
});
