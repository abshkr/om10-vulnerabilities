var fs = require('fs');
var logr = require('./logger.js');

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



function find_conn_data_for_host_msg(search_criteria, host_list)
{
	// TODO: Need to use origin and destination as the search criteria?

	var found = false;
	var conn = [];
	for (var i = 0; i < host_list.length && !found; i++)
	{
		if (search_criteria === host_list[i].ip)
		{
			var conns = host_list[i].conns;
			for (var j = 0; j < conns.length && !found; j++)
			{
				if (conns[j].data_flow_direction === "from")
				{
					conn = conns[j];
					found = true;
					break;
				}
			}
		}
	}

	return conn;
}

function find_conn_data_for_om_msg(sk_origin, sk_dest, host_list)
{
	// Use origin and destination as the search criterias

	var found = false;
	var conn = '';
	for (var i = 0; i < host_list.length && !found; i++)
	{
		if (sk_dest !== host_list[i].ip)
		{
			continue;
		}

		var conns = host_list[i].conns;
		for (var j = 0; j < conns.length && !found; j++)
		{
			conn = conns[j];
			if (conn.data_flow_direction === "to")
			{
				var routes = conn.route_to;
				for (var k = 0; k < routes.length && !found; k++)
				{
					// TODO: if search criteria used is origin,
					// this code would be wrong
					var rinfo = routes[k][sk_origin];
					if (typeof rinfo !== 'undefined' && rinfo != '')
					{
						found = true;
						break;
					}
				}
			}
		}
	}

	return conn;
}


var str_to_compare;

function string_match(str)
{
	return (str === str_to_compare);
}

/* Return a json object containing all file name fields with corresponding values */
function field_names(cfg_file_name_format, filenm)
{

	var tokens = filenm.split(cfg_file_name_format.extension_prefix);
	if (tokens == [])
	{
		return {};
	}
	var filenm_list = tokens[0].split(cfg_file_name_format.field_separator);


	// Search key is one of the fields that make up the file name
	var skey = cfg_file_name_format.fields.search_key;
	var fnlist = cfg_file_name_format.fields.field_name_list;
	var fnlistlen = fnlist.length;
	for (var fn = 0; fn < fnlistlen; ++fn) {
		var item = fnlist[fn];
		var itemkey = Object.keys(item)[0];
		var found = false;
		{
			var fns = item[itemkey];
			str_to_compare = skey;
			var skey_idx = fns.findIndex(string_match);
			if (skey_idx != -1 && skey_idx < filenm_list.length)
			{
				var skey_val = filenm_list[skey_idx];
				if (skey_val == itemkey && filenm_list.length == fns.length)
				{
					res = {};
					for (var fnsi = 0; fnsi < fns.length; ++fnsi)
					{
						res[fns[fnsi]] = filenm_list[fnsi];
					}
					return res;
				}
			}
		}
	}

	return {};
}




module.exports = {
	get_cfg_data: get_cfg_data,
	find_conn_data_for_host_msg: find_conn_data_for_host_msg,
	find_conn_data_for_om_msg: find_conn_data_for_om_msg,
	field_names: field_names
}

