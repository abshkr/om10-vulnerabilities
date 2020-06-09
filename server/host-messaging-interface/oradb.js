"use strict";

let logr = require('./logger.js');
let oradb = require('oracledb');
let ip = require('ip');
var dbconn = null;


/* Connects to database defined by OMEGA_USER, OMEGA_PWD and OMEGA_DBASE */
function
connect_to_omdb(callback)
{
	if (dbconn == null)
	{
		var db = {
            'user': process.env.OMEGA_USER,
            'password': process.env.OMEGA_PWD,
            'connectString': ip.address() + ':' + process.env.OMEGA_DBPORT + '/' + process.env.OMEGA_DBASE
		};
		this.connect_to(db,
			function(res)
			{
				if (res.ok)
				{
					callback({'ok':true, 'result': dbconn});
				}
				else
				{
					callback({'ok':false, 'result': res.result});
				}
			}
		);
	}
	else
	{
		callback({'ok':true, 'result': dbconn});
	}
}



/* Connects to user-defined database */
function connect_to(dsdata, callback) {
	var dbconnAttrs = {
		user		: dsdata.user,
		password	: dsdata.password,
		connectString	: dsdata.connectString
	};

	if (!dbconn)
	{
		/* logr.write_to_console(__filename, __line, 'connecting to db... ' + JSON.stringify(dbconnAttrs,null,'\t')); */

		oradb.getConnection(
			dbconnAttrs,
			function(err, conn)
			{
				if (err)
				{
					logr.write_to_console(__filename, __line, 'failed to connect, err:'+ err);
					callback({'ok':false,'result':err.message});
				}
				else
				{
					logr.write_to_console(__filename, __line, 'connected to db');

					dbconn = conn;

					callback({'ok':true, 'result': dbconn});
				}
			}
		);
	}
	else
	{
		callback({'ok':true, 'result': dbconn});
	}
}

function promise_connect_to(dsdata) {
	return new Promise((resolve, reject) => {
		var dbconnAttrs = {
			user		: dsdata.user,
			password	: dsdata.password,
			connectString	: dsdata.connectString
		};

		// logr.write_to_console(__filename, __line, 'connecting to db... ' + JSON.stringify(dbconnAttrs,null,'\t'));

		if (!dbconn)
		{
			oradb.getConnection(
				dbconnAttrs,
				function(err, conn)
				{
					if (err)
					{
						logr.write_to_console(__filename, __line, 'err: ' + err);
						reject({'ok':false,'err':err.message});
					}
					else
					{
						dbconn = conn;

						// logr.write_to_console(__filename, __line, 'connected to db');
						resolve({'ok':true, 'conn': dbconn});
					}
				}
			);
		}
		else
		{
			resolve({'ok':true, 'conn': dbconn});
		}
	})
}



function run_sql(query, callback) {
	if (dbconn)
	{

		// TODO: consider doing sanity check on query string
		var sql_cmd = query;
		console.log('sql_cmd:'+sql_cmd);
		var bindVal = {};

	/* logr.write_to_console(__filename, __line, 'dbconn:' + JSON.stringify(dbconn,null,'\t')); */


		dbconn.execute(sql_cmd, bindVal,
			{	autoCommit: true,
				outFormat: oradb.OBJECT		// Return result as object
			},
			function(err, result)
			{
				if (err)
				//if (err || result.rowsAffected === 0)
				{
					//logr.write_to_console(__filename, __line, 'ERROR: Could not run sql:' + err.message);
					logr.write_to_console(__filename, __line, 'ERROR: Could not run sql:' + err);
					callback({'ok':false, 'result':err.message});
				}
				else if (result.rowsAffected === 0)
				{
					logr.write_to_console(__filename, __line, 'ERROR: Could not run sql (rowsAffected == 0)');
					callback({'ok':false, 'result':'rowsAffected == 0'});
				}
				else
				{
					/* logr.write_to_console(__filename, __line, 'sql done:'+ JSON.stringify(result, null, '\t')); */

					if (result.rows)
					{
						callback({'ok':true, 'result':result.rows});
					}
					else
					{
						callback({'ok':true, 'result':result});
					}
				}
			}
		);
	}
	else
	{
		callback({'ok':false, 'result':'not connected to db'});
	}
}

function promise_run_sql(query) {
	//logr.write_to_console(__filename, __line, 'sql_cmd:'+sql_cmd)

	"use strict";

	// TODO: consider doing sanity check on query string
	var sql_cmd = query;
	var bindVal = {};

	return new Promise((resolve,reject) => {
		dbconn.execute(sql_cmd, bindVal,
			{	autoCommit: true,
				outFormat: oradb.OBJECT		// Return result as object
			},
			function(err, result)
			{
				if (err)
				//if (err || result.rowsAffected === 0)
				{
					logr.write_to_console(__filename, __line, 'ERROR: Could not run sql:' + err.message);
					reject({'ok':false, 'result':err.message});
				}
				else if (result.rowsAffected === 0)
				{
					logr.write_to_console(__filename, __line, 'ERROR: Could not run sql (rowsAffected == 0)');
					reject({'ok':false, 'result':'rowsAffected == 0'});
				}
				else
				{
					/* logr.write_to_console(__filename, __line, 'sql done:'+ JSON.stringify(result, null, '\t'));*/
					resolve({'ok':true, 'result':result});
				}
			}
		);
	})
}

function closedb()
{
	if (dbconn)
	{
		dbconn.close();
	}
}

module.exports = {
	connect_to_omdb: connect_to_omdb,
	connect_to: connect_to,
	promise_connect_to: promise_connect_to,
	run_sql: run_sql,
	promise_run_sql: promise_run_sql,
	closedb: closedb
}
