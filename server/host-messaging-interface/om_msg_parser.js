var fs = require('fs');
let path = require('path');
var cfg = require('./configr.js');


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
/*
		var search_idx = file_name_format.fields.indexOf(msg_parse_rules.file_name_field);
		var file_nm = path.basename(filenm);
		var idx = file_nm.lastIndexOf(file_name_format.extension_prefix);
		file_nm = file_nm.substring(0, idx);
		var fields = file_nm.split(file_name_format.field_separator);
		var search_key = fields[search_idx];
*/
		var fns = cfg.field_names(file_name_format, filenm);
		var search_key = fns[msg_parse_rules.file_name_field];
	}
	catch (err)
	{
		console.log('ERROR:'+err.message);
		return rinfo;
	}

	//console.log('search_key:'+search_key);


	var fileattrib = file_name_extension(filenm, file_name_format.extension_prefix);

	for (var r = 0; r < msg_parse_rules.rules.length; r++)
	{
		var rule = msg_parse_rules.rules[r];
		var rinfos = rule[search_key];
		if (typeof rinfos !== 'undefined' && rinfos != '')
		{
			var rinfo = rinfos[fileattrib.extension];
			if (typeof rinfo !== 'undefined' && rinfo != '')
			{
				// found it.
				break;
			}
		}
	}

	return rinfo;
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


function parse(conn, file, content_format)
{
	// TODO: move to a common module function
	// TODO: add option to specify content_format
	// Example of the command line:
	// ./pomsg.py -s msg_def.emm_load_ord_ack -d 0ZP2_ACK_68_7113266_20190826203221.dat -n EMM_LOAD_ACK -o 0ZP2_ACK_68_7113266_20190826203221.dat.parsed

	console.log('file:'+file);
	var src_file = file;
	var src_filenm = path.basename(file);
	//console.log('src_filenm:'+src_filenm);
	var rule = find_msg_parse_criteria(src_filenm, conn.file_name_format, conn.msg_parse_rules);
	if (typeof rule !== 'undefined' && rule != '')
	{
		var fileattrib = file_name_extension(src_filenm, conn.file_name_format.extension_prefix);



		if (content_format > 0)
		{
			if (content_format == 5)
			{
				// Use file name extension to determine
				if (fileattrib.extn == 'dat')
				{
					content_format = 1;
				}
				else if (fileattrib.extn == 'xml')
				{
					content_format = 2;
				}
			}
		}
		else if (rule.content_format)
		{
			content_format = parseInt(rule.content_format);
		}
		else
		{
			content_format = 1;
		}

		const execSync = require('child_process').execSync;
		var exe_cmd = './om_msg_parser/pomsg.py';
		var schemaf_cmd = '-s ' + './om_msg_parser/' + rule.schema;
		var dataf_cmd = '-d ' + src_file; 
		var msgnm_cmd = '-n ' + rule.name; 
		var fmt_cmd = '-m ' + parseInt(content_format); 
		var output_file = './om_msg_parser/' + src_filenm + '.parsed';
		var output_cmd = '-o ' + output_file; 

		var fld_map_cmd = '';
		var fld_map = '';
		try
		{
			fld_map = rule.field_map;
			if (fld_map)
			{ 
				fld_map_cmd = '-f ' + './om_msg_parser/' + fld_map;
			}
			else
			{
				fld_map_cmd = '';
			}
		}
		catch (err)
		{
			// Do nothing
		}

		var preproc_cmd = '';
		try
		{
			preproc = rule.preprocess;
			if (preproc)
			{
				preproc_cmd = '-p ' + './om_msg_parser/' + preproc;
			}
			else
			{
				preproc_cmd = '';
			}
		}
		catch (err)
		{
			// Do nothing
		}

		var postproc_cmd = '';
		try
		{
			// TODO: shouldn't have to do this. Need to do this at the moment to
			// prevent frontend setting content format to 1; but conflicts with the need to
			// do post processing to convert the file to xml format.
			// This error arise because currently, parser is given this conflicting inputs
			if (   content_format == 2
			    || content_format == 3
				 )
			{
				postproc = rule.postprocess;
				if (postproc)
				{
					postproc_cmd = '-q ' + './om_msg_parser/' + postproc;
				}
				else
				{
					postproc_cmd = '';
				}
			}
		}
		catch (err)
		{
			// Do nothing
		}

		var cmd = exe_cmd + ' ' + schemaf_cmd + ' ' + dataf_cmd + ' ' + msgnm_cmd + ' ' + fld_map_cmd + ' ' + preproc_cmd + ' ' + postproc_cmd + ' ' + fmt_cmd + ' ' + output_cmd;
		console.log('cmd: ' + cmd);

		var eres = [];
		try
		{
			eres = execSync(cmd);
			//console.log('Parsed result: ' + output_file);
			var msg;
			if (	 content_format == 0
					|| content_format == 1
					|| content_format == 3
				 )
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
		console.error('b:Failed to parse file ' + src_filenm + ', error:' + 'search key missing.');
		return ([false,'search key missing']);
	}
}


module.exports = {
	parse: parse,
	find_msg_parse_criteria: find_msg_parse_criteria
}
