var trsp = require('./transpose')
var logr = require('./logger')
var fs = require('fs')
var jpath = require('node-jpath');
var modbus = require('node-modbus')
var express = require('express')
var app = express()

var config_data="";
var scada_data = null
var point_data = null
var scada_map = null
var om_bay_code = 'BAY02'
var om_bay_var = 'OmegaBayCode'


// server respond to client requestuest on resource / via callback function
// by sending back the string "Hello World!"

const mbclient = modbus.client.tcp.complete({
    'host': '10.1.10.184', /* IP or name of server host */
    'port': 4322, /* request connection on this port */
    'unitId': 1,
    'timeout': 20000, /* 10 sec */
    'autoReconnect': true, /* reconnect on connection is lost */
    'reconnectTimeout': 15000, /* wait 15 sec if auto reconnect fails too often */
    'logLabel' : 'ScadamanModbusClientTCP', /* label to identify in log files */
    'logLevel': 'debug', /* for less log use: info, warn or error */
    'logEnabled': false
})

mbclient.connect()

mbclient.on('connect', function connected_to_modbus_server() {
	logr.write_to_console(__filename, __line, 'connected to scadaman at '+mbclient.host+':'+mbclient.port);
});

mbclient.on('error', function received_err(err) {
	logr.write_to_console(__filename, __line, 'scadaman modbus client error:' + err);
	idle = true;
});

mbclient.on('close', function disconnected_from_modbus_server() {
	logr.write_to_console(__filename, __line, 'disconnected from scadaman')
	idle = true;
});


var poll_interval = 1000
function get_data_from_scadaman() {
	trsp.set_retrieve_status(true)
	tmr = setInterval( function () {
		logr.write_to_console(__filename, __line, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!get_data_from_scadaman - done_flag:'+trsp.get_retrieve_status(), 1)
		if ( trsp.get_retrieve_status() == true ) {
			trsp.set_retrieve_status(false)
			logr.write_to_console(__filename, __line, 'get_data_cfg - scada data object ...... start', 1)
			get_data_cfg()
			logr.write_to_console(__filename, __line, 'get_data_cfg - scada data object ...... end', 1)
			var res = jpath.filter(scada_data, "Bay["+om_bay_var+".value="+om_bay_code+"]");
			if (res != '')
			{
				scada_map = res;
				logr.write_to_console(__filename, __line, "transpose - scada data object ...... start", 1)
				trsp.clear_transposed_data()
				trsp.transpose(res)
				logr.write_to_console(__filename, __line, "transpose - scada data object ...... end", 1)
				logr.write_to_console(__filename, __line, 'retrieve_point_data done ..... start', 1)
				trsp.retrieve_point_data(mbclient, process_scada_data)
			}
			else
			{
				//var msg = 'ERROR: Scada data not available'
				//logr.write_to_console(__filename, __line, msg)
			}
		}
	}, poll_interval)
}


function get_data_cfg() {
	var cfg_file = __dirname + '/' + 'data_config4bay2.json'
	var data = null

	try
	{
		data = fs.readFileSync(cfg_file, 'utf8')
	}
	catch (ex)
	{
		var msg = 'ERROR:'+ex;
		logr.write_to_console(__filename, __line, msg)
		logr.write_to_omega_log(__filename, __line, msg)
		return;
	}

	try
	{
		config_data = data;
		scada_data = JSON.parse(data);	
	}
	catch (ex)
	{
		var msg = 'ERROR: Failed to parse ' + cfg_file + ', ' + ex
		logr.write_to_console(__filename, __line, msg)
		logr.write_to_omega_log(__filename, __line, msg)
		scada_data = null;
	}
}


function process_scada_data(pt_data) {
	//logr.write_to_console(__filename, __line, '--------process_scada_data(pt_data):'+typeof(pt_data), 1)
	point_data = pt_data;
	/*var res = jpath.filter(scada_data, "Bay["+om_bay_var+".value="+om_bay_code+"]");
	if (res != '')
	{

		var trn_num = parseInt(trsp.point_val(res[0].TransactionID.type, res[0].TransactionID.addr));
		logr.write_to_console(__filename, __line, 'trn_num:'+trn_num)
		var load_id = parseInt(trsp.point_val(res[0].LoadID.type, res[0].LoadID.addr));
		logr.write_to_console(__filename, __line, 'load_id:'+load_id)
	}*/
}

//get_data_cfg()
get_data_from_scadaman()



app.get(
	'/',
	function (request, res)
	{
		res.send('Hello World!')
	}
)

app.get(
	'/hello',
	function (request, res)
	{
		res.send('goodbye!')
	}
)

app.get(
	'/scada_data',
	function (request, res)
	{
		res.json(scada_data)
	}
)

app.get(
	'/scada_map/:value?',
	function (request, res)
	{
		//om_bay_code = request.params.value
		//res.send('/scada_map/:id/:value>>'+(typeof request.params)+"<<...>>"+(request.params.id)+"<<...>>"+(typeof request.params.value)+"|||")
		//res.send('/scada_map/:id/:value>>'+request.params.id+"<<...>>"+request.params.value+"|||")
		//return;
		if ( typeof request.params != 'undefined' && typeof request.params.value != 'undefined' && request.params.value != '' && request.params.value != null )
		//if ( request.params.hasOwnProperty("value") && request.params.value != '' && request.params.value != null && request.params.value != undefined )
		//if ( request.params.value != '' && request.params.value != null )
		{
			om_bay_code = request.params.value
		}
		else
		{
			om_bay_code = 'BAY02'
		}
		
		trsp.map_point_data(scada_map);
		
		res.json(scada_map)
	}
)

app.get(
	'/point_data/:value?',
	function (request, res)
	{
		//om_bay_code = request.params.value
		//res.send('/point_data/:id/:value>>'+(typeof request.params)+"<<...>>"+(request.params.id)+"<<...>>"+(typeof request.params.value)+"|||")
		//res.send('/point_data/:id/:value>>'+request.params.id+"<<...>>"+request.params.value+"|||")
		//return;
		logr.write_to_console(__filename, __line, '===============request.params.value'+request.params.value, 1)
		
		if ( typeof request.params != 'undefined' && typeof request.params.value != 'undefined' && request.params.value != '' && request.params.value != null )
		//if ( request.params.hasOwnProperty("value") && request.params.value != '' && request.params.value != null && request.params.value != undefined )
		//if ( request.params.value != '' && request.params.value != null )
		{
			om_bay_code = request.params.value
		}
		else
		{
			om_bay_code = 'BAY02'
		}
		
		res.json(point_data)
	}
)
/*
app.get(
	'/point_data/:id',
	function (request, res)
	{
		om_bay_var = request.params.id
		om_bay_code = "BAY01"
		res.json(point_data)
	}
)

app.get(
	'/point_data',
	function (request, res)
	{
		om_bay_var = "OmegaBayCode"
		om_bay_code = "BAY01"
		res.json(point_data)
	}
)
*/

app.post(
	'/postsomething',
	function (request, res)
	{
		res.send('Got a POST requestuest!')
	}
)

app.put(
	'/user',
	function (request, res)
	{
		res.send('Got a PUT requestuest at /user')
	}
)

app.delete(
	'/user',
	function (request, res)
	{
		res.send('Got a DELETE requestuest at /user')
	}
)


app.listen(
	3000,
	function ()
	{
		console.log('Example app listening on port 3000!')
	}
)
