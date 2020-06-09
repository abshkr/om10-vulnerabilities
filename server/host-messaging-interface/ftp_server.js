var ftpd = require('ftpd'),
  fs = require('fs'),
  path = require('path'),
  keyFile,
  certFile,
  server,
  options = {
    host: process.env.IP || '127.0.0.1',
    port: process.env.PORT || 7002,
    tls: null
  };

if (process.env.KEY_FILE && process.env.CERT_FILE) {
  console.log('Running as FTPS server');
  if (process.env.KEY_FILE.charAt(0) !== '/') {
    keyFile = path.join(__dirname, process.env.KEY_FILE);
  }
  if (process.env.CERT_FILE.charAt(0) !== '/') {
    certFile = path.join(__dirname, process.env.CERT_FILE);
  }
  options.tls = {
    key: fs.readFileSync(keyFile),
    cert: fs.readFileSync(certFile),
    ca: !process.env.CA_FILES ? null : process.env.CA_FILES
      .split(':')
      .map(function (f) {
        return fs.readFileSync(f);
      })
  };
}
else {
  console.log();
  console.log('*** To run as FTPS server,                 ***');
  console.log('***  set "KEY_FILE", "CERT_FILE"           ***');
  console.log('***  and (optionally) "CA_FILES" env vars. ***');
  console.log();
}

server = new ftpd.FtpServer(options.host, {
  getInitialCwd: function () {
    return '/incoming';
  },
  getRoot: function () {
    return process.cwd();
  },
  pasvPortRangeStart: 1025,
  pasvPortRangeEnd: 1050,
  tlsOptions: options.tls,
  allowUnauthorizedTls: true,
  useWriteFile: false,
  useReadFile: false,
  uploadMaxSlurpSize: 7000 // N/A unless 'useWriteFile' is true.
});

server.on('error', function (error) {
  console.log('FTP Server error:', error);
});

server.on('client:connected', function (connection) {
	var username = null;
	console.log('-------------------------------->client connected: ' + connection.remoteAddress);
	connection.on('command:user', function (user, success, failure) {

		// TODO: Need to check user
		if (user == "omega") {
			username = user;
			console.log('-------------------------------->HERE1a');
			success();
		} else {
			console.log('-------------------------------->HERE1b');
			failure();
		}
	});

	connection.on('command:pass', function (pass, success, failure) {

		// TODO: Need to check password
		if (pass) {
			console.log('-------------------------------->HERE2');
			success(username);
		} else {
			failure();
		}
	});

	connection.on('file:stor', function (res, data) {
		if (res == "open")
		{
			console.log('--------------------------------> Storing file ' + JSON.stringify(data));
		}
		else if (res == "error")
		{
			console.log('--------------------------------> Failed to store file ' + JSON.stringify(data));
		}
		else if (res == "close")
		{
			console.log('--------------------------------> Stored file ' + JSON.stringify(data)); 

			// TODO: Invoke router
		}
	});


	connection.on('file:retr', function (res) {
		console.log('-------------------------------->file:stor:'+res);
	});


});



server.debugging = 4;
server.listen(options.port);
console.log('Listening on port ' + options.port);

