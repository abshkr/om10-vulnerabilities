var jpath = require('node-jpath');
var fs = require('fs')
var point_data = {}
var async = require('async')
var client;
var cvtr = require('./converter')
var logr = require('./logger')

function transpose_from_file(filenm) {
	var dcs_data = null
	fs.readFileSync(filenm, 'utf8', function (err, data) {
		if (err) {
			logr.write_to_console(__filename, __line, 'ERROR:'+err);
		}

		try
		{
			dcs_data = JSON.parse(data);	
			now = Date.now()
			//logr.write_to_console(__filename, __line, now + ': dcs_data parsed')
			//logr.write_to_console(__filename, __line, JSON.stringify(dcs_data, null, '\t'))
		}
		catch (ex)
		{
			var msg = 'ERROR: No valid JSON data in file ' + ex
			logr.write_to_console(__filename, __line, msg)
			logr.write_to_omega_log(__filename, __line, msg)
			dcs_data = null;
		}

		return transpose(dcs_data);
	})
}


function transpose(json_data) {

	transpose_now(json_data, '', '');

	//logr.write_to_console(__filename, __line, 'addr_data:')
	//logr.write_to_console(__filename, __line, JSON.stringify(addr_data, null, '\t'))

	if (addr_data != null && "bit" in addr_data && "point" in addr_data.bit)
	{
		addr_data.bit.point.sort(sort_by('addr', false, parseInt));
	}

	if (addr_data != null && "int2Byte" in addr_data && "point" in addr_data.int2Byte)
	{
		addr_data.int2Byte.point.sort(sort_by('addr', false, parseInt));
	}

	if (addr_data != null && "int4Byte" in addr_data && "point" in addr_data.int4Byte)
	{
		addr_data.int4Byte.point.sort(sort_by('addr', false, parseInt));
	}

	if (addr_data != null && "float4Byte" in addr_data && "point" in addr_data.float4Byte)
	{
		addr_data.float4Byte.point.sort(sort_by('addr', false, parseInt));
	}

	if (addr_data != null && "string" in addr_data && "point" in addr_data.string)
	{
		addr_data.string.point.sort(sort_by('addr', false, parseInt));
	}

	//logr.write_to_console(__filename, __line, 'sorted addr_data:')
	//logr.write_to_console(__filename, __line, JSON.stringify(addr_data, null, '\t'))

	point_data = addr_data;
	return addr_data;
}




var sort_by = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}




var typ = '', addr = -1, regCnt = -1
var addr_data = {}

function transpose_now(x,indent, typ) {
	Object.keys(x).forEach(function(key) {
		//logr.write_to_console(__filename, __line, ' -----> '+ 'typ:'+typ+',addr:'+addr+',regCnt:'+regCnt)
		//logr.write_to_console(__filename, __line, 'k:'+indent + key + ',x:'+x);
		var value = x[key];

		if ('object' == typeof(value))
		{

			typ = '';
			addr = -1;
			regCnt = -1;
			transpose_now(value, indent + ' ', typ);
		}
		else
		{
			if (key == 'type')
			{
				typ = value
			}

			if (key == 'addr')
			{
				addr = value
			}

			if (key == 'regCnt')
			{
				regCnt = value
			}
			//logr.write_to_console(__filename, __line, 'v:'+indent + ' ' + value);

			//logr.write_to_console(__filename, __line, 'typ:'+typ+',addr:'+addr+',regCnt:'+regCnt)


			if (typ != '' && addr != -1 && regCnt != -1)
			{
				// these three parameters may appear anywhere in the list

				//logr.write_to_console(__filename, __line, ' -----> '+ 'typ:'+typ+',addr:'+addr+',regCnt:'+regCnt)

				if (typ in addr_data)
				{
					if (addr < addr_data[typ]["minAddr"])
					{
						addr_data[typ]["minAddr"] = addr
					}

					if (addr > addr_data[typ]["maxAddr"])
					{
						addr_data[typ]["maxAddr"] = addr
					}
				}
				else
				{
					addr_data[typ] = {}
					addr_data[typ]["minAddr"] = addr
					addr_data[typ]["maxAddr"] = addr
					addr_data[typ]["point"] = []
				}

				var match = jpath.filter(addr_data, typ+".point[addr="+addr+"]");
				//logr.write_to_console(__filename, __line, 'bbb:match:')
				//logr.write_to_console(__filename, __line, JSON.stringify(match, null, '\t'))
	
				if (match.length == 0)	
				{
					// Only add the point if its address does not exist elsewhere

					//logr.write_to_console(__filename, __line, 'aaa: addr:'+addr)
					//logr.write_to_console(__filename, __line, addr_data[typ]["point"])

					item = {}
					item["addr"] = addr
					item["regCnt"] = regCnt
					item["value"] = null
					addr_data[typ]["point"].push(item)
				}
			}
		}
	});
};


var modbus_max_msg_data_len = 248	// 256 bytes, take away 2 bytes because it seems to be the limit of node-modbus
var bit_cur_start_addr = 0, bit_cur_end_addr = 0
var int2Byte_cur_start_addr = 0, int2Byte_cur_end_addr = 0
var int4Byte_cur_start_addr = 0, int4Byte_cur_end_addr = 0
var float4Byte_cur_start_addr = 0, float4Byte_cur_end_addr = 0
var string_cur_start_addr = 0, string_cur_end_addr = 0


function read_register_bit(cb) {
	if ("bit" in point_data)
	{
		tmr = setTimeout( function () {

			// address of bit points is specified on a per-bit-basis.
			// node-modbus's readCoil function seems to read a minimum of 8 bits at a time
			var regCnt = bit_cur_end_addr - bit_cur_start_addr + 1

			if (regCnt > modbus_max_msg_data_len * 8)
			{
				bit_cur_end_addr = bit_cur_start_addr + (modbus_max_msg_data_len * 8) - 1
				regCnt = modbus_max_msg_data_len * 8
			}
			logr.write_to_console(__filename, __line, 'bit:bit_cur_start_addr:'+bit_cur_start_addr+', bit_cur_end_addr:'+bit_cur_end_addr)
			client.readCoils(bit_cur_start_addr, regCnt).then(function (resp) {
				logr.write_to_console(__filename, __line, '----------> read_register_bit:');
				logr.write_to_console(__filename, __line, resp);
				store_register_bit(resp)
				fs.writeFile( './point_data.json', JSON.stringify(point_data, null, '\t'), 'utf8', null );
				clearTimeout(tmr);

				logr.write_to_console(__filename, __line, 'bit:bit_cur_end_addr:'+bit_cur_end_addr)
				if (bit_cur_end_addr < point_data.bit.maxAddr)
				{
					bit_cur_start_addr = bit_cur_end_addr + 1
					bit_cur_end_addr = point_data.bit.maxAddr
					read_register_bit(cb)
				}
				else
				{
					bit_cur_start_addr = 0
					bit_cur_end_addr = 0
					cb()
				}
			})
		}, 10)
	}
	else
	{
		cb()
	}
}

function store_register_bit(resp) {
	for (var i = bit_cur_start_addr; i <= bit_cur_end_addr; i++)
	{
		var pt = jpath.filter(point_data, "bit.point[addr="+i+"]")
		if (pt != '')
		{
			res = resp.coils[pt[0].addr - bit_cur_start_addr]
			if ("value" in pt[0])
			{
				pt[0].value = res
			}
			else
			{
				pt[0]["value"] = res
			}
		}
	}
}

function read_register_int2Byte(cb) {
	if ("int2Byte" in point_data)
	{
		tmr = setTimeout( function () {

			var regCnt = int2Byte_cur_end_addr - int2Byte_cur_start_addr + 1

			if (regCnt > modbus_max_msg_data_len / 2)
			{
				int2Byte_cur_end_addr = int2Byte_cur_start_addr + (modbus_max_msg_data_len/2)
				regCnt = modbus_max_msg_data_len / 2
			}

			client.readHoldingRegisters(int2Byte_cur_start_addr, regCnt).then(function (resp) {
				logr.write_to_console(__filename, __line, '----------> read_register_int2Byte:');
				store_register_int2Byte(resp)
				fs.writeFile( './point_data.json', JSON.stringify(point_data, null, '\t'), 'utf8', null );
				clearTimeout(tmr);

				if (int2Byte_cur_end_addr < point_data.int2Byte.maxAddr)
				{
					int2Byte_cur_start_addr = int2Byte_cur_end_addr + 1
					int2Byte_cur_end_addr = point_data.int2Byte.maxAddr
					read_register_int2Byte(cb)
				}
				else
				{
					int2Byte_cur_start_addr = 0
					int2Byte_cur_end_addr = 0
					cb()
				}
			})
		}, 10)
	}
	else
	{
		cb()
	}
}

function store_register_int2Byte(resp) {
	for (var i = int2Byte_cur_start_addr; i <= int2Byte_cur_end_addr; i++)
	{
		var pt = jpath.filter(point_data, "int2Byte.point[addr="+i+"]")
		if (pt != '')
		{
			res = resp.register[pt[0].addr - int2Byte_cur_start_addr]
			if ("value" in pt[0])
			{
				pt[0].value = res
			}
			else
			{
				pt[0]["value"] = res
			}
		}
	}
}

function read_register_int4Byte(cb) {
	if ("int4Byte" in point_data)
	{
		tmr = setTimeout( function () {

			var regCnt = int4Byte_cur_end_addr - int4Byte_cur_start_addr + 2

			if (regCnt > modbus_max_msg_data_len / 2)
			{
				int4Byte_cur_end_addr = int4Byte_cur_start_addr + (modbus_max_msg_data_len/2)
				regCnt = modbus_max_msg_data_len/2
			}

			logr.write_to_console(__filename, __line, 'int4Byte:int4Byte_cur_start_addr:'+int4Byte_cur_start_addr+', int4Byte_cur_end_addr:'+int4Byte_cur_end_addr+', regCnt:'+regCnt)
			client.readHoldingRegisters(int4Byte_cur_start_addr, regCnt).then(function (resp) {
				logr.write_to_console(__filename, __line, '----------> read_register_int4Byte:');
				store_register_int4Byte(resp)
				fs.writeFile( './point_data.json', JSON.stringify(point_data, null, '\t'), 'utf8', null );
				clearTimeout(tmr);

				if (int4Byte_cur_end_addr < point_data.int4Byte.maxAddr)
				{
					int4Byte_cur_start_addr = int4Byte_cur_end_addr + 2
					int4Byte_cur_end_addr = point_data.int4Byte.maxAddr
					read_register_int4Byte(cb)
				}
				else
				{
					int4Byte_cur_start_addr = 0
					int4Byte_cur_end_addr = 0
					cb()
				}
			})
		}, 10)
	}
	else
	{
		cb()
	}
}


function store_register_int4Byte(resp) {
	for (var i = int4Byte_cur_start_addr; i <= int4Byte_cur_end_addr; i+=2)
	{
		var pt = jpath.filter(point_data, "int4Byte.point[addr="+i+"]")
		if (pt != '')
		{
			res = cvtr.uint16ToInt(resp.register[pt[0].addr - int4Byte_cur_start_addr], resp.register[pt[0].addr - int4Byte_cur_start_addr + 1])
			if ("value" in pt[0])
			{
				pt[0].value = res
			}
			else
			{
				pt[0]["value"] = res
			}
		}
	}
}

function read_register_float4Byte(cb) {
	if ("float4Byte" in point_data)
	{
		tmr = setTimeout( function () {

			var regCnt = float4Byte_cur_end_addr - float4Byte_cur_start_addr + 2

			if (regCnt > modbus_max_msg_data_len / 2)
			{
				float4Byte_cur_end_addr = float4Byte_cur_start_addr + (modbus_max_msg_data_len/2)
				regCnt = modbus_max_msg_data_len / 2
			}

			logr.write_to_console(__filename, __line, 'float4Byte:float4Byte_cur_start_addr:'+float4Byte_cur_start_addr+', float4Byte_cur_end_addr:'+float4Byte_cur_end_addr+', regCnt:'+regCnt)
			client.readHoldingRegisters(float4Byte_cur_start_addr, regCnt).then(function (resp) {
				logr.write_to_console(__filename, __line, '----------> read_register_float4Byte:');
				store_register_float4Byte(resp)
				fs.writeFile( './point_data.json', JSON.stringify(point_data, null, '\t'), 'utf8', null );
				clearTimeout(tmr);

				if (float4Byte_cur_end_addr < point_data.float4Byte.maxAddr)
				{
					float4Byte_cur_start_addr = float4Byte_cur_end_addr + 2
					float4Byte_cur_end_addr = point_data.float4Byte.maxAddr
					read_register_float4Byte(cb)
				}
				else
				{
					float4Byte_cur_start_addr = 0
					float4Byte_cur_end_addr = 0
					cb()
				}
			})
			.error(function (err) {
				logr.write_to_console(__filename, __line, 'shit');	
			})
		}, 10)
	}
	else
	{
		cb()
	}
}

function store_register_float4Byte(resp) {
	logr.write_to_console(__filename, __line, 'srf:'+ float4Byte_cur_start_addr + ',' + float4Byte_cur_end_addr)
	for (var i = float4Byte_cur_start_addr; i <= float4Byte_cur_end_addr; i+=2)
	{
		var pt = jpath.filter(point_data, "float4Byte.point[addr="+i+"]")
		if (pt != '')
		{
			logr.write_to_console(__filename, __line, 'srf:'+ i + ',' + resp.register[pt[0].addr - float4Byte_cur_start_addr] + ',' + resp.register[pt[0].addr - float4Byte_cur_start_addr + 1])
			res = cvtr.uint16ToFloat32(resp.register[pt[0].addr - float4Byte_cur_start_addr], resp.register[pt[0].addr - float4Byte_cur_start_addr + 1])
			if ("value" in pt[0])
			{
				pt[0].value = res
			}
			else
			{
				pt[0]["value"] = res
			}
		}
	}
}


var string_resp = null
function read_register_string(cb) {
	if ("string" in point_data)
	{
		tmr = setTimeout( function () {
			var lastFieldRegCnt = parseInt(jpath.filter(point_data, "string.point[addr="+point_data.string.maxAddr+"].regCnt"))
			logr.write_to_console(__filename, __line, 'lastFieldRegCnt:'+lastFieldRegCnt)
			var regCnt = string_cur_end_addr - string_cur_start_addr + lastFieldRegCnt

			if (regCnt > modbus_max_msg_data_len / 2)
			{
				string_cur_end_addr = string_cur_start_addr + (modbus_max_msg_data_len/2)
				regCnt = modbus_max_msg_data_len / 2
			}

			logr.write_to_console(__filename, __line, 'string:string_cur_start_addr:'+string_cur_start_addr+', string_cur_end_addr:'+string_cur_end_addr+', regCnt:'+regCnt)
			client.readHoldingRegisters(string_cur_start_addr, regCnt).then(function (resp) {
				logr.write_to_console(__filename, __line, '----------> read_register_string:');
				string_resp = Buffer.concat([string_resp,resp.payload])
				logr.write_to_console(__filename, __line, 'string_resp:'+string_resp);
				clearTimeout(tmr);

				if (string_cur_end_addr < point_data.string.maxAddr)
				{
					string_cur_start_addr = string_cur_end_addr + 1
					string_cur_end_addr = point_data.string.maxAddr
					read_register_string(cb)
				}
				else
				{
					string_cur_start_addr = 0
					string_cur_end_addr = 0
					store_register_string()
					fs.writeFile( './point_data.json', JSON.stringify(point_data, null, '\t'), 'utf8', null );
					cb()
				}
			})
		}, 10)
	}
	else
	{
		cb()
	}
}


function store_register_string() {
	logr.write_to_console(__filename, __line, 'string_resp:'+ string_resp.toString('utf8'))

	string_cur_start_addr = point_data.string.minAddr
	string_cur_end_addr = point_data.string.maxAddr

	dbgmsg = ''
	for (var pt of point_data.string.point)
	{
		var start = (pt.addr - string_cur_start_addr) * 2
		var end = start + (pt.regCnt * 2)


		if ("value" in pt)
		{
			pt.value = string_resp.toString('utf8', start, end).replace(/\0/g, '')
			dbgmsg += 'A:('+pt.addr + ',' + start + ',' + end + ',' + pt.value + ')\n'
		}
		else
		{
			pt[value] = string_resp.toString('utf8', start, end).replace(/\0/g, '')
			dbgmsg += 'B:('+pt.addr + ',' + start + ',' + end + ',' + pt.value + ')\n'
		}
	}
	logr.write_to_console(__filename, __line, dbgmsg)

	string_cur_start_addr = 0
	string_cur_end_addr = 0
	string_resp = null
}




function retrieve_point_data(modbus_client, cb) {

	client = modbus_client

	if ("bit" in point_data)
	{
		bit_cur_start_addr = point_data.bit.minAddr
		bit_cur_end_addr = point_data.bit.maxAddr
	}

	if ("int2Byte" in point_data)
	{
		int2Byte_cur_start_addr = point_data.int2Byte.minAddr
		int2Byte_cur_end_addr = point_data.int2Byte.maxAddr
	}

	if ("int4Byte" in point_data)
	{
		int4Byte_cur_start_addr = point_data.int4Byte.minAddr
		int4Byte_cur_end_addr = point_data.int4Byte.maxAddr
	}

	if ("float4Byte" in point_data)
	{
		float4Byte_cur_start_addr = point_data.float4Byte.minAddr
		float4Byte_cur_end_addr = point_data.float4Byte.maxAddr
	}

	if ("string" in point_data)
	{
		string_cur_start_addr = point_data.string.minAddr
		string_cur_end_addr = point_data.string.maxAddr
	}

	string_resp = new Buffer ([])

	async.series([read_register_bit, read_register_int2Byte, read_register_int4Byte, read_register_float4Byte, read_register_string], () => {
		logr.write_to_console(__filename, __line, 'retrieve_point_data done')
		cb(point_data)
	})
};


var typ = '', addr = -1
function update_point_val(x) {
	Object.keys(x).forEach(function(key) {
		logr.write_to_console(__filename, __line, 'k:'+ key + ',x:'+x);
		var value = x[key];

		if ('object' == typeof(value))
		{
			typ = '';
			addr = -1;
			update_point_val(value);
		}
		else
		{
			if (key == 'type')
			{
				typ = value
			}

			if (key == 'addr')
			{
				addr = value
			}

			if (typ != '' && addr != -1)
			{
				//val = point_data[typ].point["value"]
				var res = jpath.filter(point_data, typ+".point[addr="+addr+"].value");
				if (res != '')
				{
					logr.write_to_console(__filename, __line, 'val:'+res)

					if ("value" in x)
					{
						x[value] = res
					}
					else
					{
						x[value] = res
					}
				}
			}
		}
	});
}


function point_val(pt_type, pt_addr) {
	return jpath.filter(point_data, pt_type + ".point[addr=" + pt_addr + "].value")
}

function clear_transposed_data() {
	point_data = {}
	addr_data = {}
}

module.exports = {
	transpose_from_file: transpose_from_file,
	transpose: transpose,
	retrieve_point_data: retrieve_point_data,
	point_val: point_val,
	clear_transposed_data: clear_transposed_data
}
