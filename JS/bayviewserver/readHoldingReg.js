const node_modbus = require('node-modbus')

const client = node_modbus.client.tcp.complete({
    'host': '192.168.0.146', /* IP or name of server host */
    'port': 502, /* well known Modbus port */
    'unitId': 0, 
    'timeout': 10000, /* 2 sec */
    'autoReconnect': true, /* reconnect on connection is lost */
    'reconnectTimeout': 15000, /* wait 15 sec if auto reconnect fails to often */
    'logLabel' : 'ModbusClientTCP', /* label to identify in log files */
    'logLevel': 'debug', /* for less log use: info, warn or error */
    'logEnabled': true
})

const time_interval = 1000
client.connect()
client.on('connect', function () {
  setTimeout( function () {
    client.readHoldingRegisters(1050, 2).then(function (resp) {
        // resp will look like { fc: 3, byteCount: 20, register: [ values 0 - 10 ], payload: <Buffer> }
        console.log(resp);
        //console.log(resp.payload);
        //console.log(resp.payload[0].toString(16));
        //console.log(String.fromCharCode(parseInt(resp.payload[1].toString())));

//var hexarrayout = [];
//for (var i=0; i<resp.length; i++) {
 //   hexarrayout.push(resp.payload.charCodeAt(i).toString(16));
//}
//console.log(hexarrayout);

        now = Date.now()
        console.log('done:'+now)
	client.close()
    }, console.error)

     //client.readHoldingRegisters(0, 6).then((response) => console.log(response))
  }, time_interval) /* reading coils every second */

 })
