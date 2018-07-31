const node_modbus = require('node-modbus')

const client = node_modbus.client.tcp.complete({
    'host': '10.1.10.206', /* IP or name of server host */
    'port': 4322, /* well known Modbus port */
    'unitId': 1, 
    'timeout': 10000, /* 2 sec */
    'autoReconnect': true, /* reconnect on connection is lost */
    'reconnectTimeout': 15000, /* wait 15 sec if auto reconnect fails to often */
    'logLabel' : 'ModbusClientTCP', /* label to identify in log files */
    'logLevel': 'debug', /* for less log use: info, warn or error */
    'logEnabled': true
})

const time_interval = 10000
client.connect()
client.on('connect', function () {
  setTimeout( function () {
     //client.readCoils(0, 6).then((response) => console.log(response.payload))
     client.readCoils(10, 100).then((response) => console.log(response))
     now = Date.now()
     console.log('done:'+now)
     client.close()
  }, time_interval) /* reading coils every second */
 })

