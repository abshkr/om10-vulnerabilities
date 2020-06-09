// TODO: consider storing secret key in a different way
let fs = require('fs');
let path = require('path');

/* Default exec directory */
let exedir = '/usr/omega/bin/msgbroker';

//let secretFile = path.join(exedir + '/' + '.secret');
let secretFile = path.join('./' + '.secret');

function secret()
{
	return fs.readFileSync(secretFile);
}

module.exports = {
	secret: secret
}
