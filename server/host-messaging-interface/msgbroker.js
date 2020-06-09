const { fork } = require('child_process');
var fs = require('fs');
var logr = require('./logger.js');
var cfg = require('./configr.js');

var cfg_file = __dirname + '/' + 'config.json';

var children = [];

/*
function get_cfg_data(filenm) {
    var data = null;
    var cfg_data = null;

    try
    {
        data = fs.readFileSync(filenm, 'utf8');
    }
    catch (ex)
    {
        logr.write_to_console(__filename, __line, 'ERROR:'+ex);
        return;
    }

    try
    {
        cfg_data = JSON.parse(data);
        //logr.write_to_console(__filename, __line, 'cfg_data parsed:')
        //logr.write_to_console(__filename, __line, JSON.stringify(cfg_data, null, '\t'))
    }
    catch (ex)
    {
        var msg = 'ERROR: Failed to parse ' + filenm + ' , ' + ex;
        logr.write_to_console(__filename, __line, msg);
        //logr.write_to_omega_log(__filename, __line, msg);
    }

    return cfg_data;
}
*/

function startup() {
	var cfgData = cfg.get_cfg_data(cfg_file);
	var server;
	var dirmonitor;


	// TODO:
	// 1. move to one function;
	// 2. fix up argument list
	var restArgs = [];
	// TODO: Could not pass JSON object for some reason ...
	//restArgs.push(JSON.stringify(cfgData.hosts));
	// TODO: instead of passing file and expect restapi to
	// parse it again, use parent.send() and child.on('message').
	//restArgs.push(cfg_file);
	//restArgs.push(cfgData.hosts);
	restArgs.push(8443);
	restArgs.push('.');
	var restScript = './restapi.js';
	var restapisrvr = fork(restScript, restArgs);
	children.push(restapisrvr);
	var cfgArgs = [];
	cfgArgs.push('config');
	cfgArgs.push(cfgData.hosts);
	//restapisrvr.send(cfgArgs);


	for (var host of cfgData.hosts)
	{
		for (var conn of host.conns)
		{     
			if (conn.data_flow_direction == "from")
			{
				if (conn.start_as == "dir_monitor")
				{
					var drmArgs = [];
					drmArgs.push(conn.data_flow_direction);
					drmArgs.push(host.ip);

					// TODO: Could not pass JSON object for some reason ...
					//drmArgs.push(JSON.stringify(conn));
					//drmArgs.push(conn);

					// TODO: may need full path here ...
					var drmScript = './dir_monitor.js';
					var drm = fork(drmScript, drmArgs);
					children.push(drm);
					drm.send(conn);
					drm.on('message', (msg) => {
						// TODO: add message header for verification 
						console.log('msgbroker:from dir_monitor:received:'+msg);
						restapisrvr.send(msg);
					});



					//server = require('./dir_monitor.js');
				}
				else if (conn.protocol == "tls_socket")
				{
					if (conn.start_as == "server")
					{
						server = require('./tls_server.js');

						var drmArgs = [];
						drmArgs.push(host.ip);

						// TODO: may need full path here ...
						var drmScript = './dir_monitor.js';
						var drm = fork(drmScript, drmArgs);

						// TODO: need to keep track of child process?
						//children.push(drm);
					}
				}
				else if (conn.protocol == "tcp_socket")
				{
					if (conn.start_as == "server")
					{
						server = require('./tcp_server.js');

						var drmArgs = [];
						drmArgs.push(host.ip);

						// TODO: may need full path here ...
						var drmScript = './dir_monitor.js';
						var drm = fork(drmScript, drmArgs);

						// TODO: need to keep track of child process?
						//children.push(drm);
					}
				}
				else if (conn.protocol == "ftp")
				{
					if (conn.start_as == "server")
					{
						server = require('./ftp_server.js');
					}
				}
			}
			else if (conn.data_flow_direction == "to")
			{
				if (conn.start_as == "dir_monitor")
				{
					var drmArgs = [];
					drmArgs.push(conn.data_flow_direction);
					drmArgs.push(host.ip);

					// TODO: Could not pass JSON object for some reason ...
					//drmArgs.push(JSON.stringify(conn));
					//drmArgs.push(conn);

					// TODO: may need full path here ...
					var drmScript = './dir_monitor.js';
					var drm = fork(drmScript, drmArgs);
					children.push(drm);
					drm.send(conn);
					drm.on('message', (msg) => {
						// TODO: add message header for verification 
						console.log('msgbroker:to dir_monitor:received:'+msg);
						restapisrvr.send(msg);
					});


					//server = require('./dir_monitor.js');
				}

			}
			else if (conn.data_flow_direction == "to_and_fro")
			{

			}
			else
			{

			} 
		}
	}
}

function cleanup()
{
	for (var child of children)
	{
		child.kill();
	}
}

startup();

process.on('exit', () => {
	//console.log('msgbroker exiting ...');
	cleanup();
});

process.on('SIGINT', function() {
    //console.log('msgbroker interrupted ...');
	process.exit();
});
