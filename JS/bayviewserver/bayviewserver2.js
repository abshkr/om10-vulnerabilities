var trsp = require('./transpose')
var logr = require('./logger')
var fs = require('fs')
var jpath = require('node-jpath');
var modbus = require('node-modbus')
var express = require('express')
var app = express()

var scada_data = null
var point_data = null
var om_bay_code = 'BAY01'
var om_bay_var = 'OmegaBayCode'


// server respond to client requestuest on resource / via callback function
// by sending back the string "Hello World!"

const mbclient = modbus.client.tcp.complete({
    'host': '10.1.10.206', /* IP or name of server host */
    'port': 4322, /* request connection on this port */
    'unitId': 1,
    'timeout': 20000, /* 10 sec */
    'autoReconnect': true, /* reconnect on connection is lost */
    'reconnectTimeout': 15000, /* wait 15 sec if auto reconnect fails too often */
    'logLabel' : 'ScadamanModbusClientTCP', /* label to identify in log files */
    'logLevel': 'debug', /* for less log use: info, warn or error */
    'logEnabled': true
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


var poll_interval = 2000
function get_data_from_scadaman() {
	tmr = setInterval( function () {
		var res = jpath.filter(scada_data, "Bay["+om_bay_var+".value="+om_bay_code+"]");
		if (res != '')
		{
			trsp.transpose(res)
			trsp.retrieve_point_data(mbclient, process_scada_data)
		}
		else
		{
			//var msg = 'ERROR: Scada data not available'
			//logr.write_to_console(__filename, __line, msg)
		}
	}, poll_interval)
}


function get_data_cfg() {
	var cfg_file = __dirname + '/' + 'data_config.json'
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
		scada_data = JSON.parse(data);	
	}
	catch (ex)
	{
		var msg = 'ERROR: Failed to parse ' + cfg_file + ', ' + ex
		logr.write_to_console(__filename, __line, msg)
		logr.write_to_omega_log(__filename, __line, msg)
		dcs_data = null;
	}
}


function process_scada_data(pt_data) {
	point_data = pt_data;
	var res = jpath.filter(scada_data, "Bay["+om_bay_var+".value="+om_bay_code+"]");
	if (res != '')
	{

		var trn_num = parseInt(trsp.point_val(res[0].TransactionID.type, res[0].TransactionID.addr));
		logr.write_to_console(__filename, __line, 'trn_num:'+trn_num)
		var load_id = parseInt(trsp.point_val(res[0].LoadID.type, res[0].LoadID.addr));
		logr.write_to_console(__filename, __line, 'load_id:'+load_id)
	}
}

get_data_cfg()
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
	'/point_data/:id/:value',
	function (request, res)
	{
		res.send('/point_data/:id/:value>>'+("typeof request")+"<<...>>|||")
		//res.send('/point_data/:id/:value>>'+(typeof request.params)+"<<...>>"+(typeof request.params.id)+"<<...>>"+(typeof request.params.value)+"|||")
		//res.send('/point_data/:id/:value>>'+request.params.id+"<<...>>"+request.params.value+"|||")
		return;
		if ( typeof request.params != 'undefined' && typeof request.params.id != 'undefined' && request.params.id != '' && request.params.id != null )
		//if ( request.params.hasOwnProperty("id") && request.params.id != '' && request.params.id != null && request.params.id != undefined )
		//if ( request.params.id != '' && request.params.id != null )
		{
			om_bay_var = request.params.id
		}
		else
		{
			om_bay_var = 'OmegaBayCode'
		}
		if ( typeof request.params != 'undefined' && typeof request.params.value != 'undefined' && request.params.value != '' && request.params.value != null )
		//if ( request.params.hasOwnProperty("value") && request.params.value != '' && request.params.value != null && request.params.value != undefined )
		//if ( request.params.value != '' && request.params.value != null )
		{
			om_bay_code = request.params.value
		}
		else
		{
			om_bay_code = 'BAY01'
		}
		res.send('/point_data/:id/:value>>'+om_bay_var+"<<...>>"+om_bay_code+"|||")
		//res.send('/point_data/:id/:value>>'+request.params.id+"<<...>>"+request.params.value+"|||")
		return;
		//res.json(om_bay_var+"...."+om_bay_code)
		res.json(point_data)
	}
)

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
