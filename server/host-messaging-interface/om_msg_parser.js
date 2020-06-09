var fs = require('fs');
let path = require('path');


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


function find_msg_parse_criteria(filenm, file_name_format, msg_parse_rules)
{
	var rinfo = '';

	try
	{
		var search_idx = file_name_format.fields.indexOf(msg_parse_rules.file_name_field);
		var file_nm = path.basename(filenm);
		var idx = file_nm.lastIndexOf(file_name_format.extension_prefix);
		file_nm = file_nm.substring(0, idx);
		var fields = file_nm.split(file_name_format.field_separator);
		var search_key = fields[search_idx];
	}
	catch (err)
	{
		console.log('ERROR:'+err.message);
		return rinfo;
	}

	//console.log('search_key:'+search_key);

	for (var r = 0; r < msg_parse_rules.rules.length; r++)
	{
		var rule = msg_parse_rules.rules[r];
		rinfo = rule[search_key];
		if (typeof rinfo !== 'undefined' && rinfo != '')
		{
			break;
		}
	}

	return rinfo;
}



function parse(conn, file, content_format)
{
	// TODO: move to a common module function
	// TODO: add option to specify content_format
	// Example of the command line:
	// ./pomsg.py -s msg_def.emm_load_ord_ack -d 0ZP2_ACK_68_7113266_20190826203221.dat -n EMM_LOAD_ACK -o 0ZP2_ACK_68_7113266_20190826203221.dat.parsed

	var src_file = file;
	var src_filenm = path.basename(file);
	//console.log('src_filenm:'+src_filenm);
	var rule = find_msg_parse_criteria(src_filenm, conn.file_name_format, conn.msg_parse_rules);
	if (typeof rule !== 'undefined' && rule != '')
	{
		const execSync = require('child_process').execSync;
		var exe_cmd = './om_msg_parser/pomsg.py';
		var schemaf_cmd = '-s ' + './om_msg_parser/' + rule.schema;
		var dataf_cmd = '-d ' + src_file; 
		var msgnm_cmd = '-n ' + rule.name; 
		var fmt_cmd = '-m ' + parseInt(content_format); 
		var output_file = './om_msg_parser/' + src_filenm + '.parsed';
		var output_cmd = '-o ' + output_file; 
		var cmd = exe_cmd + ' ' + schemaf_cmd + ' ' + dataf_cmd + ' ' + msgnm_cmd + ' ' + fmt_cmd + ' ' + output_cmd;

		var eres = [];
		try
		{
			eres = execSync(cmd);
			//console.log('Parsed result: ' + output_file);
			var msg;
			if (content_format == 1)
			{
				msg = fs.readFileSync(output_file, 'utf8');
			}
			else if (content_format == 2)
			{
				msg = JSON.parse(fs.readFileSync(output_file, 'utf8'));
			}
			else
			{
				remove_file(output_file);
				return ([false,'invalid content format']);
			}

			remove_file(output_file);
			return ([true,msg]);
		}
		catch (ex)
		{
			//logr.write_to_console(__filename, __line, ex.message);
			console.error('a:Failed to parse file ' + src_filenm + ', error:' + ex.message);
			remove_file(output_file);
			return ([false,ex.message]);
		}
	}
	else
	{
		//logr.write_to_console(__filename, __line, ex.message);
		console.error('b:Failed to parse file ' + src_filenm + ', error:' + 'search key missing');
		return ([false,'search key missing']);
	}
}


module.exports = {
	parse: parse,
	find_msg_parse_criteria: find_msg_parse_criteria
}
