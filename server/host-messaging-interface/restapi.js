let express = require('express');
let app = express();
let fs = require('fs');
let path = require('path');
let ip = require('ip');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//var pgdb = require('./pgdb.js');
var oradb = require('./oradb.js');
var parser = require('./om_msg_parser.js');
var secret = require('./secret.js');
var cfg = require('./configr.js');
const EventEmitter = require('events');
var hostEvents = null; 
var omEvents = null; 
const bcrypt = require('bcrypt');
const withAuth = require('./auth.js');
let dbconn = null;
let originIP = process.env.MSGBROKER_ORIGIN_IP || '127.0.0.1';
let originPort = process.env.MSGBROKER_ORIGIN_PORT || 8000;
let proto = process.env.MSGBROKER_PROTO || 'https';
let originURL = proto + '://' + originIP + ':' + originPort;
console.log('originURL:'+originURL);
let db_conn_ok = false;

var cors = require('cors');
var corsOptions = {
	origin: originURL,
	credentials: true
};

// First arg is node, second arg is this script, so slice them away.
var args = process.argv.slice(2);

app.enable('trust proxy');
//app.enable(cors(corsOptions));
app.use(cors(corsOptions));

// BEWARE: when using post method with text body data, must:
// 1. on client side, set content type to 'text/plain' in header, AND
// 2. on server side, specify text body in second arg in the route
app.use(bodyParser.text({type: 'text/*'}));

app.use(cookieParser());

app.use(function(req, res, next) {
	this.req = req;
	//this.req.body.verify = (proto === 'https');
	this.req.body.verify = false;
	next();
});


/* Default port number is 8443 */
let portnum = 8443;

/* Default exec directory */
let exedir = './certs';

// TODO: fix up argument list
var hosts_cfg = cfg.get_cfg_data('./config.json')
if (args.length == 1)
{
}
else if (args.length == 2)
{
	portnum = parseInt(args[0]);
	exedir = args[1];
}

if (args.length == 3)
{
	portnum = parseInt(args[1]);
	exedir = args[2];
}

try
{
	oradb.connect_to_omdb(function(res) {
		if (res.ok)
		{
			db_conn_ok = true;
		}	
	});
}
catch(err)
{
	console.error(err);
	throw err;
}


	if (proto === 'https')
	{
		start_https();
	}
	else if (proto === 'http')
	{
		start_http();
	}
	else
	{
		console.error('Unknown protocol <' + proto + '>');
	}

process.on('message', (msg) => {
	var table;
	var eventStream = null;

	if (msg.length !== 5)
	{
		console.log('ERROR: expected 5 items but received ' + msg.length);
		return;
	}

	var msg_ty = msg[0];
	var action = msg[1];
	var origin = msg[2];
	var message_id = msg[3];
	var recv_time = msg[4];

	if (msg_ty === 'from')
	{
		table = 'in_msgs';
		eventStream = hostEvents;
	}
	else if (msg_ty === 'to')
	{
		table = 'out_msgs';
		eventStream = omEvents;
	}
	else
	{
		console.log('ERROR: ' + msg[0] + ' is not a valid header');
		return;
	}

	if (action !== 'add' && action !== 'modify')
	{
		console.log('ERROR: ' + action + ' is not a valid action');
		return;
	}
	//console.log('restapi:received '+ action + ':'+origin+','+message_id+','+recv_time);

	// Postgresql
	//var sql = "SELECT * FROM " + table + " WHERE origin=" + "'" + origin + "'"
	//			+ " and " + "message_id=" + "'" + message_id + "'"
	//			+ " and " + "recv_time=" + "'" + recv_time + "';";

	// Oracle
	var dformat = 'YYYY-MM-DDHH24:MI:SS.FF';
	var rtime = recv_time.replace(/[TZ]/g, '');
	var sql = "SELECT * FROM " + table + " WHERE origin=" + "'" + origin + "'"
				+ " and " + "message_id=" + "'" + message_id + "'"
				+ " and " + "recv_time=" + "to_timestamp('" + rtime + "','" + dformat + "')";

	try
	{
		oradb.run_sql(sql, 
			function(sqlres) {
				//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

				if (sqlres.ok)
				{
					if (eventStream)
					{
						eventStream.emit('push', action, sqlres.result[0]);
					}
				}
				else
				{
					if (eventStream)
					{
						eventStream.emit('push', 'err', { error: "automatic update failed. Use manual update."});
					}
				}
			}
		);
	}
	catch (err)
	{
		eventStream.emit('push', 'err', { error: "automatic update failed. Use manual update."});
	}
});



function copy_file(file, from_dir, to_dir, file_name_format)
{

/*
	fs.createReadStream('test.log').pipe(fs.createWriteStream('newLog.log'));
*/

	var file_nm = path.basename(file);
	var idx = file_nm.lastIndexOf(file_name_format.extension_prefix);
	file_nm = file_nm.substring(0, idx);
	idx = file_nm.lastIndexOf(file_name_format.field_separator);
	file_nm = file_nm.substring(0, idx);
	var src_file = from_dir + '/' + file;
	var now = new Date().toISOString();
	now = now.replace(/[T\-:.Z]/g, '');
	var dest_filenm =  file_nm + file_name_format.field_separator + now
				+ file_name_format.extension_prefix
				+ file_name_format.extension;
	var dest_file = to_dir + '/' + dest_filenm;

	fs.copyFile(src_file, dest_file, (err) => {
		if (err)
		{
			console.error('Failed: ' + src_file + ' ---> ' + dest_file
									+ '\n\terror: ' + err);
		
			throw err;
		}
		else
		{
			//console.log('Copied: ' + src_file + ' ---> ' + dest_file);
		};
	});

	return dest_filenm;
}



function remove_file(file)
{
	try
	{
		fs.unlinkSync(file);
	}
	catch(err)
	{
		console.error(err);
		throw err;
	}
}


function start_https()
{
	//console.log('start_https');
	let https = require('https');
	let privateKeyFile = path.join(exedir + '/' + 'cert_and_key.pem');
	let privateKey = fs.readFileSync(privateKeyFile);
	let certFile = path.join(exedir + '/' + 'cert_and_key.pem');
	let certificate = fs.readFileSync(certFile);
	let sslOptions = {'key' : privateKey, 'cert' : certificate };
	const tlssrvr = https.createServer(sslOptions, app);

	// The default nodejs http socket timeout of two minutes cause ERR_INCOMPLETE_CHUNKED_ENCODING in Chrome.
	// To prevent this disable the timeout by setting 0.
	tlssrvr.setTimeout(0);

	tlssrvr.listen(portnum,
		function()
		{
			console.log('rest api listening on ' + proto + '://' + originIP + ':' + portnum);
		}
	);
}

function start_http()
{
	//console.log('start_http');
	var server = app.listen(portnum,
		function ()
		{
			console.log('rest api listening on ' + proto + '://' + originIP + ':' + portnum);
		}
	);
	server.setTimeout(0);
}



// ++++++++++++++++++++++++++++++++ 







/*
app.use (function (req, res, next) {
	//if (req.headers['x-forwarded-proto'] === 'https') {
    //if((req.secure) && (req.get('X-Forwarded-Proto') === 'https')) {
	if (req.secure) {
		//request was via https, so do no special handling
		//console.log('next ...');
		next();
	} else {
		// request was via http, so redirect to https
		newurl = 'https://' + req.headers.host + req.url;
		console.log('redirecting to ' + newurl);

		// TODO: Fix address and port
		res.redirect(newurl);
	}
});
*/

app.on('connection', (client) => {
	console.log('received connection from:'+ client);
});

// TODO: need to specify argument list
app.get('/',
	function (request, res)
	{
 		let result = {};
		let endpoints = [];
		endpoints.push('ping');
		endpoints.push('host_message');
		endpoints.push('host_message/:rec_id');
		endpoints.push('omega_message');
		endpoints.push('omega_message/:rec_id');
		endpoints.push('resubmit/host_message');
		endpoints.push('resubmit/omega_message');
		endpoints.push('parse/host_message');
		endpoints.push('parse/omega_message');
		endpoints.push('submit/host_message');
		endpoints.push('submit/omega_message');

		// TODO: Add http response code 200

		var resp = {};
		resp["message"] = endpoints;
		res.setHeader('Content-Type', 'application/json');
		res.status(200);
		res.send(resp);
	}
);

app.post('/register', express.json(),
	(req, res) => {
		//const { email, password } = req.body;
		const email = req.body.email;
		const password = req.body.password;
		var saltRounds = 10;


		// TODO:
		// * input sanitization i.e. escape inputs
		// * how to update existing password
		// * how to add/update other auxiliary user data

		bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
			if (err)
			{
				res.status(500);
				var resp = {};
				resp["message"] = err.message;
				res.setHeader('Content-Type', 'application/json');
				res.send(resp);
				return;
			}
			else
			{
				var sql = "INSERT INTO ch_users " + "(email, password)"
								+ "VALUES ("
								+ "'" + email + "'"
								+ ","
								+ "'" + hashedPassword + "'"
								+ ")";
				oradb.run_sql(sql, 
					function(sqlres) {
						//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

						var resp = {};
						if (sqlres.ok)
						{
							res.status(200);
							resp["message"] = 'Registration successful';
						}
						else
						{
							res.status(500);
							resp["message"] = sqlres.result;
						}

						res.setHeader('Content-Type', 'application/json');
						res.send(resp);
					}
				);
			}
		});
	}
);

app.post('/authenticate', express.json(),
	(req, res) => {
		const { email, password } = req.body;

		var resp = {};
		if (   typeof email === 'undefined' || email === ''
			|| typeof password === 'undefined' || password === ''
		   )
		{
			res.status(401);
			res.statusMessage = 'email and password must not be blank';
			res.setHeader('Content-Type', 'application/text');
			res.send();
			return;
		}

		var sql = "SELECT password FROM ch_users WHERE email=" + "'" + email + "';";
		oradb.run_sql(sql, 
			function(sqlres) {
				//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

				if (sqlres.ok)
				{
					if (sqlres.result.length === 0)
					{
						res.status(401);
						res.statusMessage = 'Invalid email or password';
						res.setHeader('Content-Type', 'application/text');
						res.send();
						return;
					}

					// TODO: May have to check result contain multiple entries
					const hashedPasswd = sqlres.result[0].PASSWORD;
					//console.log('hashedPasswd:'+hashedPasswd);

					/* NOTE: The password entered by user is passed from frontend to here in plain text.
							 This may sound like a security issue; and one may suggest encryption to be
							 applied here. That will not improve security; and will in fact make the system
							 vulnerable to MITM (Man In The Middle) attacks. The reason is that the encrypted
							 password is now all that is needed to pass authentication; and a sniff on the
							 network by the MITM attacker is all that is needed.

							 The best solution to date is send the user-entered password in plain text over
							 a secure transport protocol i.e. TLS. In this way, the encryption provided by
							 TLS prevents the sniff by MITM; and allows the backend to check that the user
							 does in fact know the correct password. Still, this will not prevent someone
							 putting a knife to your throat and force you to enter the correct password.
					*/

					bcrypt.compare(password, hashedPasswd, (err, same) => {
						if (err)
						{
							res.status(500);
							res.statusMesage = 'Invalid email or password';
							res.setHeader('Content-Type', 'application/text');
							res.send();
							return;
						}
						else
						{
							if (same)
							{
								// Cookies, when used with the HttpOnly cookie flag, are not accessible
								// through JavaScript,and are immune to XSS. You can also set the Secure
								// cookie flag to guarantee the cookie is only sent over HTTPS.
								// However, cookies are vulnerable to a different type of attack:
								// cross-site request forgery (CSRF).

								// Issue token
          						const payload = { email };
								const jwt = require('jsonwebtoken');

								//Use expiresIn if a persistent cookie is needed. Omitting means a session cookie.
          						//const token = jwt.sign(payload, secret.secret(), {expiresIn: '3000s'});
          						const token = jwt.sign(payload, secret.secret(), {expiresIn: '10s'});
          						res.cookie('letmein', token, { httpOnly: true, secure: true });
          						res.cookie('alive', 6000, { secure: true });
								res.sendStatus(200);
								return;
							}
							else
							{
								res.status(401);
								res.statusMessage = 'ERROR: Invalid email or password';
								res.setHeader('Content-Type', 'application/text');
								res.send();
								return;
							}
						}
					});
				}
				else
				{
					res.status(500);
					res.statusMessage = 'Invalid email or password';
					res.setHeader('Content-Type', 'application/text');
					res.send();
					return;
				}
			}
		);
	}
);


app.post('/logout', express.json(),
	(req, res) => {
		cookie = req.cookies;
		for (var prop in cookie)
		{
			//console.log('prop:'+prop);
			if (!cookie.hasOwnProperty(prop))
			{
				continue;
			}    
			//console.log('expiring '+prop+ '...');
			res.cookie(prop, '', {expires: new Date(0)});
		}
		res.send();
		//res.clearCookie('letmein', {httpOnly: true, secure: true}).send();
	}
);

/*
app.get('/secret', withAuth, function(req, res) {
  res.status(200).send('Auth OK');
});
*/


app.post('/verifyToken', withAuth, function(req, res) {
//app.post('/verifyToken', function(req, res) {
	res.status(200).send({success: true, message: 'OK'});
});

app.get('/host_events', withAuth, (req,res) => {
//app.get('/host_events', (req,res) => {
	console.log('setting up host server-sent-events...');

	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
		'Access-Control-Allow-Origin': originURL,
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Cookie',
		'Access-Control-Allow-Credentials': true,
		'timeout': 0
	});
/*
	res.status(200).set({
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});
*/

	// This needs to be done before sending any data
	res.write('retry: 10000\n');

	res.write('data: connected to host sse\n\n');

	// Set up listeners
	if (!hostEvents)
	{
		hostEvents = new EventEmitter();
	}
	else
	{
		delete(hostEvents);
		hostEvents = new EventEmitter();
	}

	hostEvents.on('push', function(event, data) {
    	res.write('event: ' + String(event) + '\n' + 'data: ' + JSON.stringify(data) + '\n\n');
	});
});

app.get('/omega_events', withAuth, (req,res) => {
//app.get('/omega_events', (req,res) => {
	console.log('setting up omega server-sent-events...');

	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
		'Access-Control-Allow-Origin': originURL,
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Cookie',
		'timeout': 0
	});

	// This needs to be done before sending any data
	res.write('retry: 10000\n');

	res.write('data: connected to omega sse\n\n');

	// Set up listeners
	if (!omEvents)
	{
		omEvents = new EventEmitter();
	}
	else
	{
		delete(omEvents);
		omEvents = new EventEmitter();
	}

	omEvents.on('push', function(event, data) {
    	res.write('event: ' + String(event) + '\n' + 'data: ' + JSON.stringify(data) + '\n\n');
	});
});



app.get('/ping', withAuth,
//app.get('/ping', 
	function (request, res)
	{
		var resp = {};
		resp["message"] = 'pong';
		res.setHeader('Content-Type', 'application/json');
		res.status(200);
		res.send(resp);
	}
);


app.get('/config', withAuth,
//app.get('/config',
	function (request, res)
	{
		var cfg_file = __dirname + '/' + 'config.json';
		var cfgData = cfg.get_cfg_data(cfg_file);
		//console.log('cfgData:'+JSON.stringify(cfgData,null,'\t'));
		var resp = {};
		resp["message"] = cfgData;
		res.setHeader('Content-Type', 'application/json');
		res.send(resp);
	}
);



app.get('/omega_message', withAuth,
//app.get('/omega_message',
	function (request, res)
	{
		var now = new Date();
		var rtime = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
		var sql = "SELECT * FROM out_msgs where recv_time >= '" + rtime + "' order by recv_time;";
		//var sql = "SELECT * FROM out_msgs order by recv_time;";

		//For Oracle
		//WARNING: oracledb does not like semicolon at the end of sql
		var rtime = new Date(now.setMonth(now.getMonth() - 1)).toISOString().replace(/[TZ]/g, '');
		var dformat = 'YYYY-MM-DDHH24:MI:SS.FF';
		var sql = "SELECT * FROM out_msgs where recv_time >= to_timestamp('" + rtime + "','" + dformat + "') order by recv_time";

		try
		{
			//console.log('omega_message:sql:'+sql);
			oradb.run_sql(sql, 
				function(sqlres) {
					//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

					if (sqlres.ok)
					{
						res.status(200);
					}
					else
					{
						res.status(500);
					}

					var resp = {};
					resp["message"] = sqlres.result;
					res.setHeader('Content-Type', 'application/json');
					res.send(resp);
				}
			);
		}
		catch (err)
		{
			var resp = {};
			resp["message"] = err.message;
			res.setHeader('Content-Type', 'application/json');
			res.send(resp);
		}
	}
);

app.post('/omega_message/:rec_id', withAuth,
//app.post('/omega_message/:rec_id',
	function (request, res)
	{
		var sql = "SELECT * FROM out_msgs WHERE rec_id=" + "'" + request.params.rec_id + "';";
		oradb.run_sql(sql, 
			function(sqlres) {
				//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));
		
				if (sqlres.ok)
				{
					res.status(200);
				}
				else
				{
					res.status(500);
				}

				var resp = {};
				resp["message"] = sqlres.result;
				res.setHeader('Content-Type', 'application/json');
				res.send(resp);
			}
		);
	}
);

app.get('/host_message', withAuth,
//app.get('/host_message',
	function (request, res)
	{
		var now = new Date();
		//For Postgresql
		//var rtime = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
		//var sql = "SELECT * FROM in_msgs where recv_time >= '" + rtime + "' order by recv_time;";

		//For Oracle
		//WARNING: oracledb does not like semicolon at the end of the sql
		var rtime = new Date(now.setMonth(now.getMonth() - 1)).toISOString().replace(/[TZ]/g, '');
		var dformat = 'YYYY-MM-DDHH24:MI:SS.FF';
		var sql = "SELECT * FROM in_msgs where recv_time >= to_timestamp('" + rtime + "','" + dformat + "') order by recv_time";

		//var sql = "SELECT * FROM in_msgs order by recv_time;";
		//var sql = "SELECT in_msgs.*,COUNT(resubmitted_file) FROM in_msgs LEFT JOIN resubmitted_in_msgs ON in_msgs.file_name = resubmitted_in_msgs.source_file GROUP BY in_msgs.rec_id ORDER BY recv_time;";

		try
		{
			//console.log('host_message:sql:'+sql);
			oradb.run_sql(sql, 
				function(sqlres) {
					//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

					if (sqlres.ok)
					{
						res.status(200);
					}
					else
					{
						res.status(500);
					}

					var resp = {};
					resp["message"] = sqlres.result;
					res.setHeader('Content-Type', 'application/json');
					res.send(resp);
				}
			);
		}
		catch (err)
		{
			var resp = {};
			resp["message"] = err.message;
			res.setHeader('Content-Type', 'application/json');
			res.send(resp);
		}
	}
);


app.post('/host_message/:rec_id', withAuth,
//app.post('/host_message/:rec_id',
	function (request, res)
	{
		var sql = "SELECT * FROM in_msgs WHERE rec_id=" + "'" + request.params.rec_id + "';";
		oradb.run_sql(sql, 
			function(sqlres) {
				//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

				if (sqlres.ok)
				{
					res.status(200);
				}
				else
				{
					res.status(500);
				}

				var resp = {};
				resp["message"] = sqlres.result;
				res.setHeader('Content-Type', 'application/json');
				res.send(resp);
			}
		);
	}
);

// BEWARE: when using post method with json body data, must:
// 1. on client side, set json content type in header, AND
// 2. on server side, specify json body in second arg in the route
app.post('/resubmit/host_message', withAuth, express.json(),
//app.post('/resubmit/host_message', express.json(),
	function (request, res)
	{
		var sql = "SELECT origin, file_name, archived_file FROM in_msgs WHERE rec_id=" + "'" + request.body.rec_id + "'";
		oradb.run_sql(sql, 
			function(sqlres) {
				//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));
				if (sqlres.ok)
				{
					// TODO: May have to check if result contains multiple entries
					var conn = cfg.find_conn_data_for_host_msg(sqlres.result[0].ORIGIN, hosts_cfg.hosts);
					if (typeof conn !== 'undefined' && conn != [])
					{
						var src_file = sqlres.result[0].ARCHIVED_FILE;
						var resubmitted_file = copy_file(src_file, conn.archive_dir, conn.src_dir, conn.file_name_format);

						var sql = "INSERT INTO resubmitted_in_msgs " + "(resubmitted_file, source_file)"
									+ "VALUES ("
									+ "'" + resubmitted_file + "'"
									+ ","
									+ "'" + src_file + "'"
									+ ")";
						oradb.run_sql(sql, 
							function(sqlres) {
								//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));
								if (sqlres.ok)
								{
									// TODO: write to log file?

									var resp = {};
									resp["message"] = "submitted for processing";
									res.setHeader('Content-Type', 'application/json');
									res.status(202);
									res.send(resp);
								}
								else
								{
									// TODO: sqlerr could be caused by user input => 4xx code
									// but how to distinguish it from 5xx code?

									var resp = {};
									resp["message"] = sqlres.result;
									res.setHeader('Content-Type', 'application/json');
									res.status(400);
									res.send(resp);
								}
							}
						);
					}
					else
					{
						var resp = {};
						resp["message"] = "can't find connection data of origin of requested message";
						res.setHeader('Content-Type', 'application/json');
						res.status(500);
						res.send(resp);
					}
				}
				else
				{
					// TODO: sqlerr could be caused by user input => 4xx code
					// but how to distinguish it from 5xx code?

					var resp = {};
					resp["message"] = sqlres.result;
					res.setHeader('Content-Type', 'application/json');
					res.status(400);
					res.send(resp);
				}
			}
		);
	}
);


// BEWARE: when using post method with json body data, must:
// 1. on client side, set json content type in header, AND
// 2. on server side, specify json body in second arg in the route
app.post('/resubmit/omega_message', withAuth, express.json(),
//app.post('/resubmit/omega_message', express.json(),
	function (request, res)
	{
		var sql = "SELECT origin, destination, archived_file FROM out_msgs WHERE rec_id=" + "'" + request.body.rec_id + "'";
		oradb.run_sql(sql, 
			function(sqlres) {
				//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

				if (sqlres.ok)
				{
					var conn = cfg.find_conn_data_for_om_msg(
								sqlres.result[0].ORIGIN,
								sqlres.result[0].DESTINATION,
								hosts_cfg.hosts);
					if (typeof conn !== 'undefined' && conn != [])
					{
						//console.log('conn:'+JSON.stringify(conn, null, '\t'));
						var src_file = sqlres.result[0].ARCHIVED_FILE;
						var resubmitted_file = copy_file(src_file, conn.archive_dir, conn.src_dir, conn.file_name_format);

						var sql = "INSERT INTO resubmitted_out_msgs " + "(resubmitted_file, source_file)"
									+ "VALUES ("
									+ "'" + resubmitted_file + "'"
									+ ","
									+ "'" + src_file + "'"
									+ ")";
						oradb.run_sql(sql, 
							function(sqlres) {
								//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));
								if (sqlres.ok)
								{
									// TODO: write to log file?

									var resp = {};
									resp["message"] = "submitted for processing";
									res.setHeader('Content-Type', 'application/json');
									res.status(202);
									res.send(resp);
								}
								else
								{
									// TODO: sqlerr could be caused by user input => 4xx code
									// but how to distinguish it from 5xx code?

									var resp = {};
									resp["message"] = sqlres.result;
									res.setHeader('Content-Type', 'application/json');
									res.status(400);
									res.send(resp);
								}
							}
						);
					}
					else
					{
						var resp = {};
						resp["message"] = "can't find connection data of origin of requested message";
						res.setHeader('Content-Type', 'application/json');
						res.status(500);
						res.send(resp);
					}
				}
				else
				{
					// TODO: sqlerr could be caused by user input => 4xx code
					// but how to distinguish it from 5xx code?

					var resp = {};
					resp["message"] = sqlres.result;
					res.setHeader('Content-Type', 'application/json');
					res.status(400);
					res.send(resp);
				}
			}
		);
	}
);

// BEWARE: when using post method with json body data, must:
// 1. on client side, set json content type in header, AND
// 2. on server side, specify json body in second arg in the route
app.post('/parse/host_message', withAuth, express.json(),
//app.post('/parse/host_message', express.json(),
	function (req, res)
	{
		//var sql = "SELECT origin, archived_file FROM in_msgs WHERE rec_id=" + "'" + req.params.rec_id + "';";
		var sql = "SELECT origin, archived_file FROM in_msgs WHERE rec_id=" + "'" + req.body.rec_id + "'";
		oradb.run_sql(sql, 
			function(sqlres) {
				//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

				if (sqlres.ok)
				{
					// TODO: May have to check if result contain multiple entries
					if (typeof sqlres.result[0] !== 'undefined' && sqlres.result[0] !== [])
					{
						var conn = cfg.find_conn_data_for_host_msg(sqlres.result[0].ORIGIN, hosts_cfg.hosts);
						var src_filenm = sqlres.result[0].ARCHIVED_FILE;
						var src_file = conn.archive_dir + '/' + src_filenm;
						var prsres = parser.parse(conn, src_file, req.body.content_format);
						if (prsres[0])
						{
								if (req.body.content_format === 1)
								{
									//console.log('resp:'+prsres[1]);
									res.setHeader('Content-Type', 'application/text');
								}
								else if (req.body.content_format === 2)
								{
									//console.log('resp:'+JSON.stringify(prsres[1],null,'\t'));
									res.setHeader('Content-Type', 'application/json');
								}
								res.status(200);
								res.send(prsres[1]);
						}
						else
						{
							var resp = {};
							resp["message"] = prsres[1];
							res.setHeader('Content-Type', 'application/json');
							res.status(500);
							res.send(resp);
						}
					}
					else
					{
						var resp = {};
						resp["message"] = 'no data found';
						res.setHeader('Content-Type', 'application/json');
						res.status(400);
						res.send(resp);
					}
				}
				else
				{
					// TODO: sqlerr could be caused by user input => 4xx code
					// but how to distinguish it from 5xx code?

					var resp = {};
					resp["message"] = sqlres.result;
					res.setHeader('Content-Type', 'application/json');
					res.status(400);
					res.send(resp);
				}
			}
		);
	}
);


// BEWARE: when using post method with body data, must:
// 1. on client side, set content type in header, AND
// 2. on server side, specify json body in second arg in the route
app.post('/parse/omega_message', withAuth, express.json(),
//app.post('/parse/omega_message', express.json(),
	function (req, res)
	{
		var sql = "SELECT origin, destination, archived_file FROM out_msgs WHERE rec_id=" + "'" + req.body.rec_id + "'";
		oradb.run_sql(sql, 
			function(sqlres) {
				//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

				if (sqlres.ok)
				{
					// TODO: May have to check if result contain multiple entries
					if (typeof sqlres.result[0] !== 'undefined' && sqlres.result[0] !== [])
					{
						var conn = cfg.find_conn_data_for_om_msg(
									sqlres.result[0].ORIGIN,
									sqlres.result[0].DESTINATION,
									hosts_cfg.hosts);
						//console.log('conn:'+JSON.stringify(conn,null,'\t'));
						var src_filenm = sqlres.result[0].ARCHIVED_FILE;
						var src_file = conn.archive_dir + '/' + src_filenm;
						var prsres = parser.parse(conn, src_file, parseInt(req.body.content_format));
						if (prsres[0])
						{
								//console.log('resp:'+prsres[1]);
								if (req.body.content_format === 1)
								{
									//console.log('resp:'+prsres[1]);
									res.setHeader('Content-Type', 'application/text');
								}
								else if (req.body.content_format === 2)
								{
									//console.log('resp:'+JSON.stringify(prsres[1],null,'\t'));
									res.setHeader('Content-Type', 'application/json');
								}
								res.status(200);
								res.send(prsres[1]);
						}
						else
						{
							var resp = {};
							resp["message"] = prsres[1];
							res.setHeader('Content-Type', 'application/json');
							res.status(500);
							res.send(resp);
						}
					}
					else
					{
						var resp = {};
						resp["message"] = 'no data found';
						res.setHeader('Content-Type', 'application/json');
						res.status(400);
						res.send(resp);
					}
				}
				else
				{
					// TODO: sqlerr could be caused by user input => 4xx code
					// but how to distinguish it from 5xx code?

					var resp = {};
					resp["message"] = sqlres.result;
					res.setHeader('Content-Type', 'application/json');
					res.status(400);
					res.send(resp);
				}
			}
		);
	}
);


// BEWARE: when using post method with body data, must:
// 1. on client side, set content type in header, AND
// 2. on server side, specify json body in second arg in the route
app.post('/edit/host_message', withAuth, express.json(),
//app.post('/edit/host_message', express.json(),
	function (req, res)
	{
		//console.log('submit host:req:'+JSON.stringify(req.body,null,'\t'));
		var origin = req.body.origin;
		var conn = cfg.find_conn_data_for_host_msg(origin, hosts_cfg.hosts);
		if (typeof conn !== 'undefined' && conn != [])
		{
			var file_nm = req.body.file_name;
			var idx = file_nm.lastIndexOf(conn.file_name_format.extension_prefix);
			if (idx === -1)
			{
				console.error(err);
				var resp = {};
				resp["message"] = 'invalid file name format (missing a '+ conn.file_name_format.extension_prefix + ')';
				res.setHeader('Content-Type', 'application/json');
				res.status(500);
				res.send(resp);
				return;
			}

			file_nm = file_nm.substring(0, idx);
			idx = file_nm.lastIndexOf(conn.file_name_format.field_separator);
			if (idx === -1)
			{
				console.error(err);
				var resp = {};
				resp["message"] = 'invalid file name format (missing '+ conn.file_name_format.separator + ')';
				res.setHeader('Content-Type', 'application/json');
				res.status(500);
				res.send(resp);
				return;
			}

			file_nm = file_nm.substring(0, idx);
			var now = new Date().toISOString();
			now = now.replace(/[T\-:.Z]/g, '');
			file_nm = file_nm.substr(0,idx) + "_" + now
						+ conn.file_name_format.extension_prefix
						+ conn.file_name_format.extension;

			var src_file = './' + file_nm;

			var fd;
			try
			{
				// 'w' flag ensures that file is created if it does not exist.
				fd = fs.openSync(src_file, 'w');
			}
			catch (err)
			{
				console.error(err);
				var resp = {};
				resp["message"] = err.message;
				res.setHeader('Content-Type', 'application/json');
				res.status(500);
				res.send(resp);
				return;
			}

			fs.writeSync(fd, req.body.content);
			fs.closeSync(fd);


			//console.log('src_file:'+src_file);
			var dest_filenm = file_nm;
			var dest_file = conn.src_dir + '/' + dest_filenm;

			fs.copyFile(src_file, dest_file, (err) => {
				if (err)
				{
					console.error('Failed: ' + src_file + ' ---> ' + dest_file
											+ '\n\terror: ' + err);
				
					var resp = {};
					resp["message"] = err.message;
					res.setHeader('Content-Type', 'application/json');
					res.status(500);
					res.send(resp);
				}
				else
				{
					console.log('Copied: ' + src_file + ' ---> ' + dest_file);
					var resp = {};
					resp["message"] = "submitted file " + path.basename(dest_file) + " for processing";
					res.setHeader('Content-Type', 'application/json');
					res.status(202);
					res.send(resp);

				};

				remove_file(src_file);
			});
		}
		else
		{
			var resp = {};
			resp["message"] = "can't find connection data of origin of requested message";
			res.setHeader('Content-Type', 'application/json');
			res.status(500);
			res.send(resp);
		}
	}
);

// BEWARE: when using post method with body data, must:
// 1. on client side, set content type in header, AND
// 2. on server side, specify json body in second arg in the route
app.post('/edit/omega_message', withAuth, express.json(),
//app.post('/edit/omega_message', express.json(),
	function (req, res)
	{
		//console.log('submit om:req:'+req.body);
		var origin = req.body.origin;
		var dest = req.body.destination;
		var conn = cfg.find_conn_data_for_om_msg(origin, dest, hosts_cfg.hosts);
		if (typeof conn !== 'undefined' && conn != [])
		{
			var file_nm = req.body.file_name;
			var idx = file_nm.lastIndexOf(conn.file_name_format.extension_prefix);
			if (idx === -1)
			{
				console.error(err);
				var resp = {};
				resp["message"] = 'invalid file name format (missing a '+ conn.file_name_format.extension_prefix + ')';
				res.setHeader('Content-Type', 'application/json');
				res.status(500);
				res.send(resp);
				return;
			}

			file_nm = file_nm.substring(0, idx);
			idx = file_nm.lastIndexOf(conn.file_name_format.field_separator);
			if (idx === -1)
			{
				console.error(err);
				var resp = {};
				resp["message"] = 'invalid file name format (missing '+ conn.file_name_format.separator + ')';
				res.setHeader('Content-Type', 'application/json');
				res.status(500);
				res.send(resp);
				return;
			}

			file_nm = file_nm.substring(0, idx);
			var now = new Date().toISOString();
			now = now.replace(/[T\-:.Z]/g, '');
			file_nm = file_nm.substr(0,idx) + "_" + now
						+ conn.file_name_format.extension_prefix
						+ conn.file_name_format.extension;

			var src_file = './' + file_nm;

			var fd;
			try
			{
				// 'w' flag ensures that file is created if it does not exist.
				fd = fs.openSync(src_file, 'w');
			}
			catch (err)
			{
				console.error(err);
				var resp = {};
				resp["message"] = err.message;
				res.setHeader('Content-Type', 'application/json');
				res.status(500);
				res.send(resp);
				return;
			}

			fs.writeSync(fd, req.body.content);
			fs.closeSync(fd);


			//console.log('src_file:'+src_file);
			var dest_filenm = file_nm;
			var dest_file = conn.src_dir + '/' + dest_filenm;

			fs.copyFile(src_file, dest_file, (err) => {
				if (err)
				{
					console.error('Failed: ' + src_file + ' ---> ' + dest_file
											+ '\n\terror: ' + err);
				
					var resp = {};
					resp["message"] = err.message;
					res.setHeader('Content-Type', 'application/json');
					res.status(500);
					res.send(resp);
				}
				else
				{
					console.log('Copied: ' + src_file + ' ---> ' + dest_file);
					var resp = {};
					resp["message"] = "submitted file " + path.basename(dest_file) + " for processing";
					res.setHeader('Content-Type', 'application/json');
					res.status(202);
					res.send(resp);

				};

				remove_file(src_file);
			});
		}
		else
		{
			var resp = {};
			resp["message"] = "can't find connection data of origin of requested message";
			res.setHeader('Content-Type', 'application/json');
			res.status(500);
			res.send(resp);
		}
	}
);

// BEWARE: when using post method with body data, must:
// 1. on client side, set content type in header, AND
// 2. on server side, specify json body in second arg in the route
app.post('/filter/host_message', withAuth, express.json(),
//app.post('/filter/host_message', express.json(),
	function (req, res)
	{
		//console.log('filter host:req:'+JSON.stringify(req.body,null,'\t'));
		var sql;
		var key = req.body.key;
		var value = req.body.value;

		if (key == 'origin')
		{
			if (!value)
			{
				var resp = {};
				resp["message"] = "filter criteria must be specified";
				res.setHeader('Content-Type', 'application/json');
				res.status(400);
				res.send(resp);
				return;
			}
			else
			{
				if (value[0] == '=')
				{
					sql = "SELECT * FROM in_msgs WHERE origin = " + "'" + value.substr(1) + "'";
				}
				else
				{
					sql = "SELECT * FROM in_msgs WHERE origin like " + "'%" + value + "%'";
				}
			}
		}
		else if (key == 'message_id')
		{
			if (!value)
			{
				var resp = {};
				resp["message"] = "filter criteria must be specified";
				res.setHeader('Content-Type', 'application/json');
				res.status(400);
				res.send(resp);
				return;

			}
			else
			{
				if (value[0] == '=')
				{
					sql = "SELECT * FROM in_msgs WHERE message_id = " + "'" + value.substr(1) + "'";
				}
				else
				{
					sql = "SELECT * FROM in_msgs WHERE message_id like " + "'%" + value + "%'";
				}
			}

		}
		else if (key == 'time')
		{
			var startDate = req.body.startDate;
			var startTime = req.body.startTime;
			var endDate = req.body.endDate;
			var endTime = req.body.endTime;

			if (startDate !== '' && startTime !== '' && endDate !== '' && endTime !== '')
			{
				// Postgresql
				//sql = "SELECT * FROM in_msgs WHERE "
				//		+ "recv_time >= " + "'" + startDate + " " + startTime + "' and "
				//		+ "recv_time <= " + "'" + endDate + " " + endTime
				//		+ "';";

				// Oracle
				var dformat = 'YYYY-MM-DD HH24:MI';
				sql = "SELECT * FROM in_msgs WHERE "
						+ "recv_time >= "
						+ "to_timestamp('" + startDate + " " + startTime + "','" + dformat + "') and "
						+ "recv_time <= "
						+ "to_timestamp('" + endDate + " " + endTime + "','" + dformat + "')";
			}
			else
			{
				var resp = {};
				resp["message"] = "time based filter criteria must be specified in full";
				res.setHeader('Content-Type', 'application/json');
				res.status(400);
				res.send(resp);
			}
		}
		else if (key == 'destination')
		{
			if (!value)
			{
				var resp = {};
				resp["message"] = "filter criteria must be specified";
				res.setHeader('Content-Type', 'application/json');
				res.status(400);
				res.send(resp);
			}
			else
			{
				if (value[0] == '=')
				{
					sql = "SELECT * FROM in_msgs WHERE destination = " + "'" + value.substr(1) + "'";
				}
				else
				{
					sql = "SELECT * FROM in_msgs WHERE destination like " + "'%" + value + "%'";
				}
			}
		}

		//console.log('sql:'+sql);
		try
		{
			oradb.run_sql(sql, 
				function(sqlres) {
					//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

					if (sqlres.ok)
					{
						res.status(200);
					}
					else
					{
						res.status(500);
					}

					var resp = {};
					resp["message"] = sqlres.result;
					res.setHeader('Content-Type', 'application/json');
					res.send(resp);
				}
			);
		}
		catch (err)
		{
			var resp = {};
			resp["message"] = err.message;
			res.setHeader('Content-Type', 'application/json');
			res.send(resp);
		}
	}
);



// BEWARE: when using post method with body data, must:
// 1. on client side, set content type in header, AND
// 2. on server side, specify json body in second arg in the route
app.post('/filter/omega_message', withAuth, express.json(),
//app.post('/filter/omega_message', express.json(),
	function (req, res)
	{
		//console.log('filter omega:req:'+JSON.stringify(req.body,null,'\t'));
		var sql;
		var key = req.body.key;
		var value = req.body.value;

		if (key == 'origin')
		{
			if (!value)
			{
				var resp = {};
				resp["message"] = "filter criteria must be specified";
				res.setHeader('Content-Type', 'application/json');
				res.status(400);
				res.send(resp);
				return;
			}
			else
			{
				if (value[0] == '=')
				{
					sql = "SELECT * FROM out_msgs WHERE origin = " + "'" + value.substr(1) + "'";
				}
				else
				{
					sql = "SELECT * FROM out_msgs WHERE origin like " + "'%" + value + "%'";
				}
			}
		}
		else if (key == 'message_id')
		{
			if (!value)
			{
				var resp = {};
				resp["message"] = "filter criteria must be specified";
				res.setHeader('Content-Type', 'application/json');
				res.status(400);
				res.send(resp);
				return;

			}
			else
			{
				if (value[0] == '=')
				{
					sql = "SELECT * FROM out_msgs WHERE message_id = " + "'" + value.substr(1) + "'";
				}
				else
				{
					sql = "SELECT * FROM out_msgs WHERE message_id like " + "'%" + value + "%'";
				}
			}

		}
		else if (key == 'time')
		{
			var startDate = req.body.startDate;
			var startTime = req.body.startTime;
			var endDate = req.body.endDate;
			var endTime = req.body.endTime;

			if (startDate !== '' && startTime !== '' && endDate !== '' && endTime !== '')
			{
				// Postgresql
				//sql = "SELECT * FROM out_msgs WHERE "
				//		+ "recv_time >= " + "'" + startDate + " " + startTime + "' and "
				//		+ "recv_time <= " + "'" + endDate + " " + endTime
				//		+ "';";

				// Oracle
				var dformat = 'YYYY-MM-DD HH24:MI';
				sql = "SELECT * FROM out_msgs WHERE "
						+ "recv_time >= "
						+ "to_timestamp('" + startDate + " " + startTime + "','" + dformat + "') and "
						+ "recv_time <= "
						+ "to_timestamp('" + endDate + " " + endTime + "','" + dformat + "')";
			}
			else
			{
				var resp = {};
				resp["message"] = "time based filter criteria must be specified in full";
				res.setHeader('Content-Type', 'application/json');
				res.status(400);
				res.send(resp);
			}
		}
		else if (key == 'destination')
		{
			if (!value)
			{
				var resp = {};
				resp["message"] = "filter criteria must be specified";
				res.setHeader('Content-Type', 'application/json');
				res.status(400);
				res.send(resp);
			}
			else
			{
				if (value[0] == '=')
				{
					sql = "SELECT * FROM out_msgs WHERE destination = " + "'" + value.substr(1) + "'";
				}
				else
				{
					sql = "SELECT * FROM out_msgs WHERE destination like " + "'%" + value + "%'";
				}
			}
		}

		//console.log('sql:'+sql);
		try
		{
			oradb.run_sql(sql, 
				function(sqlres) {
					//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

					if (sqlres.ok)
					{
						res.status(200);
					}
					else
					{
						res.status(500);
					}

					var resp = {};
					resp["message"] = sqlres.result;
					res.setHeader('Content-Type', 'application/json');
					res.send(resp);
				}
			);
		}
		catch (err)
		{
			var resp = {};
			resp["message"] = err.message;
			res.setHeader('Content-Type', 'application/json');
			res.send(resp);
		}
	}
);


process.on('exit', () => {
	oradb.closedb();
});

process.on('SIGINT', function() {
	process.exit();
});
