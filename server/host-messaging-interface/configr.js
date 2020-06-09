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



module.exports = {
	get_cfg_data: get_cfg_data,
	find_conn_data_for_host_msg: find_conn_data_for_host_msg,
	find_conn_data_for_om_msg: find_conn_data_for_om_msg
}

