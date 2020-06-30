var fs = require('fs');
let path = require('path');
var async = require('async');
//var shell = require('shelljs');
//var pgdb = require('./pgdb.js');
var oradb = require('./oradb.js');
var parser = require('./om_msg_parser.js');
var cfg = require('./configr.js');

// First arg is node, second arg is this script, so slice them away.
var args = process.argv.slice(2);

//var host_ip = args[0];
var host_ip = args[1];

// TODO: Could not pass JSON object for some reason ...
//var conn = JSON.parse(args[1]);
//var conn = args[1];

var db_conn_ok = false;

var basepath;
process.on('message', (msg) => {
	// TODO: add message header for verification 
	conn = msg;
	basepath = conn.src_dir;

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

	start_monitoring();
});


var str_to_compare;

function string_match(str)
{
	return (str === str_to_compare);
}

// TODO: need to be able to handle different file name field list simultaneously
function verify_file_name_format(filenm, conn)
{
	var found = false;
	for (var extn of conn.file_name_format.accept_extension)
	{
		if (filenm.endsWith(conn.file_name_format.extension_prefix + extn))
		{
			found = true;
			break;
		}
	}
	if (!found)
	{
		// File does not have the defined extension prefix and extension.
		return [false,"invalid extension prefix/suffix"];
	}

	var tokens = filenm.split(conn.file_name_format.extension_prefix);

	if (tokens == [])
	{
		// This should be impossible because the first check must pass to get this far but ... 
		return [false,"missing extension prefix"];
	}

	tokens = tokens[0].split(conn.file_name_format.field_separator);

	if (tokens == [])
	{
		// File name is not delimited by the defined field separator.
		return [false,"invalid name field separator"];
	}

/* TODO: need to add ability to handle multiple set of field names
	if (tokens.length != conn.file_name_format.fields.length)
	{
		// Parsed tokens not equal to expected tokens
		var err = 'expected ' + conn.file_name_format.fields.length + ' file name fields but only has '
					+ tokens.length;
		return [false,err];
	}
*/

	str_to_compare = '';
	var match_idx = tokens.findIndex(string_match);
	if (match_idx != -1 && match_idx < tokens.length)
	{
		// Empty content
		var err = 'file name field #' + (match_idx+1) + ' is blank';
		return [false,err];
	}

	return [true,tokens];
}


function ignore_file(file, conn)
{
	return (   (file == ".")
			|| (file === "..")
			|| file.endsWith(conn.file_name_format.ignore_extension)
		   );
}

function remove_file(file)
{
	if (!fs.existsSync(file))
	{
		return;
	}

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


/* If file exists in archive_dir, return new filename.
** Otherwise, return same file name
*/
function archive_file_nm(filenm, archive_dir, file_name_format)
{
	var file_nm = path.basename(filenm);
	var test_file_nm = archive_dir + '/' + file_nm;

	if (fs.existsSync(test_file_nm))
	{
		var idx = file_nm.lastIndexOf(file_name_format.extension_prefix);
		var extn = file_nm.substring(idx+1);
		file_nm = file_nm.substring(0, idx);
		idx = file_nm.lastIndexOf(file_name_format.field_separator);

		// TODO: This assume the last file name field is datetime.
		file_nm = file_nm.substring(0, idx);
		var now = (new Date()).toISOString().replace(/[T\-:.Z]/g, '');
		file_nm = file_nm + "_" + now
					+ file_name_format.extension_prefix
					+ extn;
		return file_nm;
	}
	else
	{
		return file_nm;
	}
}

function archive_file(file, archive_dir, file_name_format)
{
	var arch_filenm = archive_file_nm(file, archive_dir, file_name_format);
	var arch_file = archive_dir + '/' + arch_filenm;
	try
	{
		// TODO: check if directory/subdirectory is accessible at beginning.
		// Otherwise, this will fail!
		fs.renameSync(file, arch_file);
		console.log('Archived: ' + file + ' ---> ' + arch_file);
	}
	catch (err)
	{
		console.error('Failed to archive file: ' + file + ' ---> ' + arch_file + '\n\terror: ' + err);
	}

	return arch_filenm;
}


function move_file(file, to_dir)
{
/*
	// TODO: check if directory/subdirectory is accessible at beginning
	if (   !shell.test('-e', to_dir)
		|| !shell.test('-d', to_dir)) {
	{
		shell.mkdir('-p', to_dir);
		return false;
	}
*/

/*
	// This solution works across file partition; fs.rename does not.
	var filenm = path.basename(file);
	var source = fs.createReadStream(file);
	var dest = fs.createWriteStream(to_dir + '/' + filenm);
	//console.log('file:'+file + ', dest:'+ to_dir + '/' + filenm);
	source.pipe(dest);

	source.on('end', function() { // moved! } );

	source.on('error',
		function(err)
		{
			console.error('Failed: ' + file + ' ---> ' + to_dir + '/' + filenm
							+ '\n\terror: ' + err);
		}
	);
*/

	// TODO: if file already exists in archive directory, rename it and update db

	var filenm = path.basename(file);
	var oldPath = file;
	var newPath = to_dir + '/' + filenm;
/*
	fs.rename(oldPath, newPath, function (err) {
	  if (err) {
		console.error('Failed: ' + file + ' ---> ' + to_dir + '/' + filenm
								+ '\n\terror: ' + err);
		throw err
	  };
	});
*/
	fs.renameSync(oldPath, newPath);
}



function extract_data(jsmsg, res)
{
	var flds = jsmsg.fields;
	if (typeof flds !== 'undefined' && flds !== [] && flds !== '')
	{
		for (var fld of flds)
		{
			res = extract_data(fld, res);
		}
	}
	else
	{
		var val = jsmsg.value;
		if (typeof val !== 'undefined' && val !== '')
		{
			res += val;
		}
	}

	return res;
}

function write_data_to_file(jsmsg, dst_file)
{
	var fd;
	try
	{
		fs.truncateSync(dst_file, 0);
	}
	catch (err)
	{
		// do nothing
	}

	try
	{
		// 'w' flag ensures that file is created if it does not exist.
		fd = fs.openSync(dst_file, 'w')
	}
	catch (err)
	{
		console.error(err);
		return;
	}

	var resstr = '';
	resstr = extract_data(jsmsg, resstr);
	//console.log('resstr:'+resstr);
	fs.writeSync(fd, resstr);

	fs.closeSync(fd);
}

function update_in_msg(origin, message_id, recv_time, om_msg_json, out_rec_id, rule, callback)
{
	// TODO: define a configurable method of specifying the location of message id field
	console.log('om_msg_json:'+JSON.stringify(om_msg_json, null, '\t'));
	//console.log('update_in_msg');
	//console.log('out_rec_id:'+JSON.stringify(out_rec_id,null,'\t'));
	//console.log('recv_time:'+recv_time);
	var status;
	var status_desc;

	if (typeof rule !== 'undefined' && rule != '')
	{
		var status_val = om_msg_json.fields[rule.status_idx].value;

		if (status_val == 53)
		{
			status = 2;
		}
		else if (status_val == 68)
		{
			status = 3;
		}
		else
		{
			status = 3;
		}

		status_desc = om_msg_json.fields[rule.status_desc_idx].value;
	}

	//var sql = "UPDATE in_msgs "
	//		+ " set "
	//		+ " acknowledged = " + true
	//		+ ","
	//		+ " ack_id = " + "'" + out_rec_id.rec_id + "'"
	//		+ ","
	//		+ " status = " + status
	//		+ ","
	//		+ " status_description = " + "'" + status_desc + "'"
	//		+ " WHERE "
	//		+ "origin ='" + origin + "'"
	//		+ " and "
	//		+ "message_id ='" + message_id + "'"
	//		+ " and "
	//		+ "recv_time ='" + recv_time + "'"
	//		+ ";";

	// Oracle
	var dformat = 'YYYY-MM-DDHH24:MI:SS.FF';
	var rtime = recv_time.replace(/[TZ]/g, '');
	var sql = "UPDATE in_msgs "
			+ " set "
			+ " acknowledged = " + "'Y'"
			+ ","
			+ " ack_id = " + "'" + out_rec_id.REC_ID + "'"
			+ ","
			+ " status = " + status
			+ ","
			+ " status_description = " + "'" + status_desc + "'"
			+ " WHERE "
			+ "origin ='" + origin + "'"
			+ " and "
			+ "message_id ='" + message_id + "'"
			+ " and "
			+ "recv_time=" + "to_timestamp('" + rtime + "','" + dformat + "')";

	try
	{
		oradb.run_sql(sql, 
			function(sqlres) {
				//console.log('here sqlres:'+JSON.stringify(sqlres, null, '\t'));

				if (sqlres.ok)
				{
					callback(null);
				}
				else
				{
					console.log('Error:'+sqlres.result[0]);
					callback('ERROR',sqlres.result[0]);
				}
			}
		);
	}
	catch (err)
	{
		callback('ERROR',err.message);
	}
}


function get_inmsg_rec_id(origin, message_id, recv_time, callback)
{
	//console.log('get_inmsg_rec_id:'+origin+','+message_id+','+recv_time);

	//var sql = "SELECT rec_id FROM in_msgs "
	//			+ "WHERE "
	//			+ "origin = " + "'" + origin + "'"
	//			+ " and "
	//			+ "message_id = " + "'" + message_id + "'"
	//			+ " and "
	//			+ "recv_time = " + "'" + recv_time + "'";

	// Oracle
	var dformat = 'YYYY-MM-DDHH24:MI:SS.FF';
	var rtime = recv_time.replace(/[TZ]/g, '');
	var sql = "SELECT rec_id FROM in_msgs "
				+ "WHERE "
				+ "origin = " + "'" + origin + "'"
				+ " and "
				+ "message_id = " + "'" + message_id + "'"
				+ " and "
				+ "recv_time=" + "to_timestamp('" + rtime + "','" + dformat + "')";


	try
	{
		oradb.run_sql(sql, 
			function(sqlres) {
				//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

				// TODO: write to log file?

				if (sqlres.ok)
				{
					callback(null, sqlres.result[0]);
				}
				else
				{
					callback('ERROR', sqlres.result[0]);
				}
			}
		);
	}
	catch (err)
	{
		callback('ERROR',err.message);
	}

}

function link_in_to_out_msg(out_rec_id, in_rec_id, callback)
{
	//console.log('link_in_to_out_msg');

	// NOTE: in_rec_id is the result of previous function call before this function in the async waterfall

	if (typeof out_rec_id === 'undefined' || out_rec_id === [] )
	{
		callback('ERROR', 'out_rec_id is undefined');
	}
	else if (typeof in_rec_id === 'undefined' || in_rec_id === [])
	{
		callback('ERROR', 'is_rec_id is undefined');
	}
	else
	{
		var sql = "UPDATE out_msgs "
				+ " set "
				+ " related_in_msg_id = " + "'" + in_rec_id.REC_ID + "'"
				+ " WHERE "
				+ "rec_id ='" + out_rec_id.REC_ID + "'";
				//+ ";";

		try
		{
			oradb.run_sql(sql, 
				function(sqlres) {
					//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

					// TODO: write to log file?

					if (sqlres.ok)
					{
						callback(null);
					}
					else
					{
						callback('ERROR', sqlres.result);
					}
				}
			);
		}
		catch (err)
		{
			console.log('c:Error:'+err.message);
			callback('ERROR',err.message);
		}
	}
}



function acknowledge(conn, origin, message_id, file, out_rec_id, callback)
{
	// NOTE: out_rec_id is the result of previous function call before this function in the async waterfall

	// A potential source of confusion:
	// There are two variables representing the idea of message id, one in the function argument, message_id,
	// another, the internal variable, msg_id.
	// message_id is intended to be the unique identifier of the message which is the IDOC number in this case.
	// However, due to the need to allow the same message to be resubmitted into the system, this IDOC number
	// is not unique any more. Instead, a time value is also sent in the "message_id" field of the header of
	// the message sent to Omega. This field is represented by the internal variable in this fuction, msg_id.
	// The value currently used in msg_id corresponds to the recv_time in the Postgres database.

	//console.log("ack's args:" + JSON.stringify(conn, null, '\t') + ',' + origin + ',' + message_id + ',' + file, JSON.stringify(out_rec_id, null, '\t'));


	var prsres = parser.parse(conn, file, 2);
	if (prsres[0])
	{
		var msg_id;
		var jsmsg = prsres[1];
		var rule = parser.find_msg_parse_criteria(file, conn.file_name_format, conn.msg_parse_rules);
		if (typeof rule !== 'undefined' && rule != '')
		{
			// location of message id field
			//var idx = rule.msg_id_idx;

			try
			{
				var idxlist = rule.msg_id_idx.split('.');
				var idx = retrieve_idx_field(idxlist, 0, jsmsg);
				//console.log('idxfield:'+JSON.stringify(idxfield,null,'\t'));
				console.log('idx:'+idx);
				msg_id = idx.trim();
				//msg_id = jsmsg.fields[0].fields[idx].value.trim();
			}
			catch (err)
			{
				console.error('err:'+err.message);
				callback('ERROR', err.message);
				return;
			}
		}

		console.log('msg_id:'+msg_id);
		console.log('search_criteria:'+origin+','+message_id+','+msg_id);


		try
		{
			async.waterfall([
				async.apply(update_in_msg, origin, message_id, msg_id, jsmsg, out_rec_id, rule),
				async.apply(get_inmsg_rec_id, origin, message_id, msg_id),
				async.apply(link_in_to_out_msg, out_rec_id)
				], (err, res) => {
					if (!err)
					{
						var mod = [];
						mod.push("from");
						mod.push("modify");
						mod.push(origin);
						mod.push(message_id);
						mod.push(msg_id);
						process.send(mod);
					}
					callback(null);
					return;
			});
		}
		catch (err)
		{
			callback('ERROR', err.message);
			return;
		}
	}
	else
	{
		callback('ERROR', prsres[1]);
		return;
	}


}

/* TODO: put this in a common file? */
function file_name_extension(file, extension_prefix)
{
	var list = file.split(extension_prefix);
	if (list.length == 2)
	{
		var idx = list[0].lastIndexOf('/');
		base = list[0].substring(0, idx);
		extn = list[1];

		return {'base': base, 'extension': extn};
	}

	return None;
}

function retrieve_idx_field(msg_idx_list, idx, jsobj)
{
	if (idx < msg_idx_list.length)
	{
		return retrieve_idx_field(msg_idx_list, idx + 1, jsobj.fields[msg_idx_list[idx]]);
	}
	else
	{
		console.log('jsobj:'+JSON.stringify(jsobj,null,'\t'));
		return jsobj.value;
	}
}

function update_idx_field(recv_time, msg_idx_list, idx, jsobj)
{
	if (idx < msg_idx_list.length)
	{
		update_idx_field(recv_time, msg_idx_list, idx + 1, jsobj.fields[msg_idx_list[idx]]);
	}
	else
	{
		jsobj.value = recv_time.padEnd(jsobj.size, ' ');
	}
}

function update_message_id(file, conn, recv_time)
{
	console.log('update_message_id:'+file);
	var prsres = parser.parse(conn, file, 2);
	if (prsres[0])
	{
		var jsmsg = prsres[1];

		var rule = parser.find_msg_parse_criteria(file, conn.file_name_format, conn.msg_parse_rules);
		if (typeof rule !== 'undefined' && rule != '')
		{
			// location of message id field
			var idxlist = rule.msg_id_idx.split('.');
			var jsfield = update_idx_field(recv_time, idxlist, 0, jsmsg);
			console.log('jsmsg:'+JSON.stringify(jsmsg, null, '\t'));
		}

/*
		var list = file.split(conn.file_name_format.extension_prefix);
		var base = '';
		var extn = '';
		if (list.length == 2)
		{
			var idx = list[0].lastIndexOf('/');
			base = list[0].substring(0, idx);
			extn = list[1];
		}
*/
		var extn_prefix = conn.file_name_format.extension_prefix;
		var fileattrib = file_name_extension(file, extn_prefix);
		var base = fileattrib.base;
		var extn = fileattrib.extension;

		var now = new Date().toISOString();
		now = now.replace(/[T\-:.Z]/g, '');
		dest_file = base + '/' + now + extn_prefix + extn;
		write_data_to_file(jsmsg, dest_file);
		return [true,dest_file];
/*
		{
			write_data_to_file(jsmsg, file);
			return [true,file];
		}
*/
	}
	else
	{
		//callback('ERROR', prsres[1]);
		//console.log('B:Failed to parse file ' + file + ', error:' + prsres[1]);
		return [false,prsres[1]];
	}


}

function convert(file, conn)
{
	console.log('convert:'+file);
	var prsres = parser.parse(conn, file, 3);
	if (prsres[0])
	{
		var now = new Date().toISOString();
		now = now.replace(/[T\-:.Z]/g, '');
		dest_file = now + '.xml';
		return dest_file;
	}
	return '';
}

function transfer_file(file, ip_addr, dest_dir, file_nm_fmt)
{
	// TODO: Need to transfer to a temp directory first.
	// Then when the transfer is complete, move it to the final destination.

	if (!fs.existsSync(file))
	{
		res = [0,''];
		return res;
	}

	var dest_file;
	var dest_filenm;
	if (file_nm_fmt === "ORIG")
	{
		dest_filenm = path.basename(file);
		dest_file = dest_dir + '/' + dest_filenm;
	}
	else if (file_nm_fmt === "SAP")
	{
		var extension = 'SAP';
		var now = new Date().toISOString();
		now = now.replace(/[T\-:.Z]/g, '');
		dest_filenm = now + '.' + extension;
		dest_file = dest_dir + '/' + dest_filenm;
	}
	else
	{
		dest_file = dest_dir + '/' + file;
	}

	if (ip_addr == 'localhost')
	{
		// local transfer, use copy

		try
		{
			// TODO: check if directory/subdirectory is accessible at beginning.
			// Otherwise, this will fail!
			fs.copyFileSync(file, dest_file);
			console.log('Transferred: ' + file + ' ---> ' + dest_file);
			res = [res,dest_filenm];
		}
		catch (err)
		{
			console.error('Failed to transfer file: ' + file + ' ---> ' + dest_file + '\n\terror: ' + err);
			res = [0,''];
		}
	}
	else
	{
		// remote transfer, use sshpass/scp

		const execSync = require('child_process').execSync;
		// TODO: define dir containing password file
		let paswd_file = path.join('.', 'paswd');
		var exe_cmd = 'sshpass';
		var paswd_cmd = '-f ' + paswd_file; 

		scp_cmd = 'scp ' + file + ' omega@' + ip_addr + ':' + dest_file;

		var cmd = exe_cmd + ' ' + paswd_cmd + ' ' + scp_cmd;
		var res = [];
		try
		{
			res = execSync(cmd);
			console.log('Transferred: ' + file + ' ---> ' + ip_addr + ':' + dest_file);
			res = [res,dest_filenm];
		}
		catch (ex)
		{
			//logr.write_to_console(__filename, __line, ex.message);
			console.error('Failed to transfer file, ' + 'error:' + ex.message);
			res = [0,''];
		}
	}

	return res;
}


function
get_file_format(file)
{
	const execSync = require('child_process').execSync;
	var exe_cmd = 'file';
	var cmd = exe_cmd + ' ' + file;

	var res = [];
	try
	{
		res = execSync(cmd);
		res = res.toString().split(":");

		// Remove leading and trailing spaces
		//res = res[1].replace(/\s+$/g, '');
		res = res[1].trim();

		res = [1,res];
	}
	catch (ex)
	{
		//logr.write_to_console(__filename, __line, ex.message);
		console.error('Failed to get file format, ' + 'error:' + ex.message);
		return [0,ex.message];
	}

	return res;
}


function get_outmsg_rec_id(origin, message_id, recv_time, callback)
{
	// Postgresql
	//var sql = "SELECT rec_id FROM out_msgs "
	//			+ "WHERE "
	//			+ "origin = " + "'" + origin + "'"
	//			+ " and "
	//			+ "message_id = " + "'" + message_id + "'"
	//			+ " and "
	//			+ "recv_time = " + "'" + recv_time + "'";

	// Oracle
	var dformat = 'YYYY-MM-DDHH24:MI:SS.FF';
	var sql = "SELECT rec_id FROM out_msgs "
				+ "WHERE "
				+ "origin = " + "'" + origin + "'"
				+ " and "
				+ "message_id = " + "'" + message_id + "'"
				+ " and "
				+ "recv_time=" + "to_timestamp('" + recv_time + "','" + dformat + "')";

	try
	{
		oradb.run_sql(sql, 
			function(sqlres) {
				//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

				// TODO: write to log file?

				if (sqlres.ok)
				{
					callback(null, sqlres.result[0]);
				}
				else
				{
					callback('ERROR', sqlres.result[0]);
				}
			}
		);
	}
	catch (err)
	{
		//console.error('d:Error:'+err.message);
		callback('ERROR',err.message);
	}


}

function add_out_msg(origin, message_id, recv_time, destination, message_type, file_name, file_format, archived_file, callback)
{
	var dformat = 'YYYY-MM-DDHH24:MI:SS.FF';
	var sql = "INSERT INTO out_msgs "
			+ "(origin, message_id, recv_time, destination, message_type, file_name, file_format, archived_file)"
			//+ "(origin, message_id, recv_time, destination, message_type, file_name, file_format)"
			+ " VALUES ("
			+ "'" + origin + "'"
			+ ","
			+ "'" + message_id + "'"
			+ ","
			//+ "'" + recv_time + "'"
			+ "to_timestamp('" + recv_time + "','" + dformat + "')"
			+ ","
			+ "'" + destination + "'"
			+ ","
			+ "'" + message_type + "'"
			+ ","
			+ "'" + file_name + "'"
			+ ","
			+ "'" + file_format + "'"
			+ ","
			+ "'" + archived_file + "'"
			//+ ");";
			+ ")";

	try
	{
		oradb.run_sql(sql, 
			function(sqlres) {
				//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

				// TODO: write to log file?

				var add = [];
				add.push("to");
				add.push("add");
				add.push(origin);
				add.push(message_id);
				add.push(recv_time);
				process.send(add);

				callback(null);
			}
		);
	}
	catch (err)
	{
		//console.error('e:Error:'+err.message);
		callback('ERROR',err.message);
	}
}



function start_monitoring()
{
	console.log('monitoring ' + basepath + ' for files ' + conn.data_flow_direction + ' host ' + host_ip);


	var tmr = setInterval( function() {

		// TODO: define monitored directory using arg

		//Asynchronous version
	/*
		fs.readdir(basepath, function(err, items) {
			console.log(items);
	 
			//for (var i=0; i<items.length; i++) {
			//	console.log(items[i]);
			//}
			items.forEach(item => {
				console.log(item);
			});

		});
	*/

		//Synchronous version
		try
		{
			fs.readdirSync(basepath).forEach(filenm => {

				// TODO: ignore directories

				if (!ignore_file(filenm, conn))
				{
					var file = basepath + '/' + filenm;
					if (!fs.statSync(file).isDirectory())
					{
						if (conn.routing_rules.method === "by_file_name")
						{
							var file_fmt = get_file_format(file);
							if (file_fmt[0])
							{
								file_fmt = file_fmt[1];
							}

							// TODO: Check that IDOC number in file name is consistent with file content's.
							// Failure to do so will result in failure to link ack msg to incoming msg.
							// To reproduce, edit one of the incoming message and set IDOC number in file
							// content to a value different from the IDOC number in filename.
 
							var tokens = verify_file_name_format(filenm, conn);

							var now = (new Date()).toISOString().replace(/[TZ]/g, '');

							if (!tokens[0])
							{
								console.error('Invalid file name: ' + filenm + ', err: ' + tokens[1]);

								var archfile = archive_file(file, conn.archive_dir, conn.file_name_format);

								if (conn.data_flow_direction === "from")
								{
									//Oracle
									var dformat = 'YYYY-MM-DDHH24:MI:SS.FF';
									var sql = "INSERT INTO in_msgs"
												+ " (origin, message_id, recv_time, file_name, validity, status, status_description, archived_file)"
												+ " VALUES ("
												+ "'" + host_ip + "'"
												+ ","
												+ "'" + now + "'"
												+ ","
												//+ "'" + "now" + "'"
												+ "to_timestamp('" + now + "','" + dformat + "')"
												+ ","
												+ "'" + filenm + "'"
												+ ","
												//+ false
												+ "'N'"
												+ ","
												+ 4
												+ ","
												+ "'" + tokens[1] + "'"
												+ ","
												+ "'" + archfile + "'"
												//+ ");";
												+ ")";

									if (typeof sql !== 'undefined' && sql != '') 
									{
										oradb.run_sql(sql, 
											function(sqlres) {
												//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

												// TODO: write to log file?
											}
										);

										console.log('dir_monitor:adding incoming msg');
										var add = [];
										add.push("from");
										add.push("add");
										add.push(host_ip);
										add.push(now);
										add.push(now);
										process.send(add);
									}
								}
								else if (conn.data_flow_direction === "to")
								{
									// TODO: maybe don't need waterfall, just call function?
									async.waterfall([
										async.apply(add_out_msg, host_ip, filenm, now, "", "", filenm, file_fmt, archfile)
										], (err, res) => {
											if (err)
											{
												console.error(err);
											}
									});
								}
							}
							else
							{
								tokens = tokens[1];

								var route_criteria = tokens[conn.routing_rules.fld_idx];

/*
								str_to_compare = "site_code";
								var match_idx = conn.file_name_format.fields.findIndex(string_match);
								var sitecode = '';
								if (match_idx != -1 && match_idx < tokens.length)
								{
									sitecode = tokens[match_idx];
								}

								str_to_compare = "msg_type";
								match_idx = conn.file_name_format.fields.findIndex(string_match);
								var msg_ty = '';
								if (match_idx != -1 && match_idx < tokens.length)
								{
									msg_ty = tokens[match_idx];
								}

								str_to_compare = "idoc_no";
								match_idx = conn.file_name_format.fields.findIndex(string_match);
								var msg_id = '';
								if (match_idx != -1 && match_idx < tokens.length)
								{
									msg_id = tokens[match_idx];
									// NOTE: need to strip leading zero's to match up with the same field in the customised
									// file name generated by hst_s_ptr. Only then, this field can be used later on to
									// link the ACK message to the incoming message.
									msg_id = parseInt(msg_id);
								}
								else
								{
									// TODO: generate uuid
								}
*/
								var fns = cfg.field_names(conn.file_name_format, filenm);
								var sitecode = fns['site_code'];
								var msg_ty = fns['msg_type'];
								var msg_id = fns['idoc_no'];

								var found = false;
								for (var r = 0; (r < conn.route_to.length) && !found; r++)
								{
									var route = conn.route_to[r];
									var rinfo = route[route_criteria];
									if (typeof rinfo !== 'undefined' && rinfo != '')
									{
										try
										{
											//Postgresql
											//var now = new Date().toISOString();
											//now = now.replace(/[T\-:.Z]/g, '');

											//Oracle
											var now = new Date().toISOString().replace(/[TZ]/g, '');
											var dformat = 'YYYY-MM-DDHH24:MI:SS.FF';

											var file_to_trf = '';
											var is_valid = true;
											var status = 1;
											var status_desc = 'processing';
											if (conn.data_flow_direction === "from")
											{
												var res = update_message_id(file, conn, now);
												if (res[0])
												{
													file_to_trf = res[1];
												}
												else
												{
													// Don't set file_to_trf
													file_to_trf = '';
													is_valid = false;
													status = 3;
													//TODO: fix up the error message in status_desc
													//status_desc = res[1].trim();
													status_desc = 'parse error';
												}
											}
											else
											{
												var res_file = convert(file, conn);
												file_to_trf = res_file;
											}

											var archfile;
											tfres = transfer_file(file_to_trf, rinfo.ip, rinfo.dir, rinfo.file_nm_fmt);
											archfile = archive_file(file, conn.archive_dir, conn.file_name_format);

											if (conn.data_flow_direction === "from")
											{
												remove_file(file_to_trf);

												var sql = "INSERT INTO in_msgs "
														+ "(origin, message_id, recv_time, destination, dest_site, message_type, file_name, file_format, validity, status, status_description, archived_file, transferred_file)"
														//+ "(origin, message_id, recv_time, destination, dest_site, message_type, file_name, file_format, status, status_description)"
														+ " VALUES ("
														+ "'" + host_ip + "'"
														+ ","
														+ "'" + msg_id + "'"
														+ ","
														//+ "'" + now + "'"
														+ "to_timestamp('" + now + "','" + dformat + "')"
														+ ","
														+ "'" + rinfo.ip + "'"
														+ ","
														+ "'" + sitecode + "'"
														+ ","
														+ "'" + msg_ty + "'"
														+ ","
														+ "'" + filenm + "'"
														+ ","
														+ "'" + file_fmt + "'"
														+ ","
														//+ true
														+ (is_valid ? "'Y'" : "'N'")
														+ ","
														+ "'" + status + "'"
														+ ","
														+ "'" + status_desc + "'"
														+ ","
														+ "'" + archfile + "'"
														+ ","
														+ "'" + tfres[1] + "'"
														//+ ");";
														+ ")";

												if (typeof sql !== 'undefined' && rinfo != '')
												{
													oradb.run_sql(sql, 
														function(sqlres) {
															//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

															// TODO: write to log file?

															console.log('dir_monitor:adding incoming msg');
															var add = [];
															add.push("from");
															add.push("add");
															add.push(host_ip);
															add.push(msg_id);
															add.push(now);
															process.send(add);
														}
													);
												}

												found = true;
											}
											else if (conn.data_flow_direction === "to")
											{
												if (msg_ty === "ACK")
												{
													async.waterfall([
														async.apply(add_out_msg, sitecode, msg_id, now, rinfo.ip, msg_ty, filenm, file_fmt, archfile),
														async.apply(get_outmsg_rec_id, sitecode, msg_id, now),
														async.apply(acknowledge, conn, rinfo.ip, msg_id, conn.archive_dir + '/' + archfile)
														], (err, res) => {
															if (err)
															{
																console.error(err);
															}
													});
												}
												else
												{
													async.waterfall([
														async.apply(add_out_msg, sitecode, msg_id, now, rinfo.ip, msg_ty, filenm, file_fmt, archfile)
														], (err, res) => {
															if (err)
															{
																console.error(err);
															}
													});
												}

												found = true;
											}
											else
											{
												console.error('unknown data flow direction');
												break;
											}
										}
										catch(err)
										{
											console.error(err);
											//throw err;
										}

										break;
									}
								}

								if (!found)
								{
									// files that has site code that are not defined in config file
									console.error('ERROR: no route for route criteria ' + route_criteria);

									var archfile = archive_file(file, conn.archive_dir, conn.file_name_format);

									if (conn.data_flow_direction === "from")
									{
										remove_file(file);

										var now = new Date().toISOString().replace(/[TZ]/g, '');
										var dformat = 'YYYY-MM-DDHH24:MI:SS.FF';
										var is_valid = false;
										var status = 3;
										var status_desc = 'route criteria is missing';

										var sql = "INSERT INTO in_msgs "
												+ "(origin, message_id, recv_time, destination, dest_site, message_type, file_name, file_format, validity, status, status_description, archived_file, transferred_file)"
												+ " VALUES ("
												+ "'" + host_ip + "'"
												+ ","
												+ "'" + msg_id + "'"
												+ ","
												//+ "'" + now + "'"
												+ "to_timestamp('" + now + "','" + dformat + "')"
												+ ","
												+ "''"
												+ ","
												+ "'" + sitecode + "'"
												+ ","
												+ "'" + msg_ty + "'"
												+ ","
												+ "'" + filenm + "'"
												+ ","
												+ "'" + file_fmt + "'"
												+ ","
												//+ true
												+ (is_valid ? "'Y'" : "'N'")
												+ ","
												+ "'" + status + "'"
												+ ","
												+ "'" + status_desc + "'"
												+ ","
												+ "'" + archfile + "'"
												+ ","
												+ "''"
												//+ ");";
												+ ")";

										if (typeof sql !== 'undefined' && rinfo != '')
										{
											oradb.run_sql(sql, 
												function(sqlres) {
													//console.log('sqlres:'+JSON.stringify(sqlres, null, '\t'));

													// TODO: write to log file?

													console.log('dir_monitor:adding incoming msg');
													var add = [];
													add.push("from");
													add.push("add");
													add.push(host_ip);
													add.push(msg_id);
													add.push(now);
													process.send(add);
												}
											);
										}
									}
									else if (conn.data_flow_direction === "to")
									{
										async.waterfall([
											async.apply(add_out_msg, sitecode, msg_id, now, "", msg_ty, filenm, file_fmt, archfile)
											], (err, res) => {
												if (err)
												{
													console.error(err);
												}
										});
									}
								}
							}
						}
					}
				}
			});
		}
		catch(err)
		{
			console.error(err);
		}

	}, 5000);
}



//start_monitoring();

process.on('exit', () => {
	oradb.closedb();
});

process.on('SIGINT', function() {
	process.exit();
});
