var jpath = require('node-jpath');
var fs = require('fs')
var point_data = {}
var async = require('async')
var client;
var cvtr = require('./converter')
var logr = require('./logger')

var done_flag=true;
var bitRanges=[];
var int2ByteRanges=[];
var int4ByteRanges=[];
var float4ByteRanges=[];
var stringRanges=[];

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
		bitRanges = transpose_ranges(addr_data.bit.point, "bit");
	}

	if (addr_data != null && "int2Byte" in addr_data && "point" in addr_data.int2Byte)
	{
		addr_data.int2Byte.point.sort(sort_by('addr', false, parseInt));
		int2ByteRanges = transpose_ranges(addr_data.int2Byte.point, "int2Byte");
	}

	if (addr_data != null && "int4Byte" in addr_data && "point" in addr_data.int4Byte)
	{
		addr_data.int4Byte.point.sort(sort_by('addr', false, parseInt));
		int4ByteRanges = transpose_ranges(addr_data.int4Byte.point, "int4Byte");
	}

	if (addr_data != null && "float4Byte" in addr_data && "point" in addr_data.float4Byte)
	{
		addr_data.float4Byte.point.sort(sort_by('addr', false, parseInt));
		float4ByteRanges = transpose_ranges(addr_data.float4Byte.point, "float4Byte");
	}

	if (addr_data != null && "string" in addr_data && "point" in addr_data.string)
	{
		addr_data.string.point.sort(sort_by('addr', false, parseInt));
		stringRanges = transpose_ranges(addr_data.string.point, "string");
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
var addr_data_string = "";

function transpose_now(x,indent, typ) {
	Object.keys(x).forEach(function(key) {
		//logr.write_to_console(__filename, __line, "key: "+key, 1)
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

				//var match = jpath.filter(addr_data, typ+".point[addr="+addr+"]");
				var match = addr_data_string.indexOf( typ+"___"+addr+"|" );
				//logr.write_to_console(__filename, __line, 'bbb:match:')
				//logr.write_to_console(__filename, __line, JSON.stringify(match, null, '\t'))

				//if (match.length == 0)
				if (match < 0)
				{
					// Only add the point if its address does not exist elsewhere

					//logr.write_to_console(__filename, __line, '........................type: '+typ+' addr:'+addr, 1)
					//logr.write_to_console(__filename, __line, addr_data[typ]["point"], 1)

					item = {}
					item["addr"] = addr
					item["regCnt"] = regCnt
					item["value"] = null
					addr_data[typ]["point"].push(item)
					addr_data_string += typ+"___"+addr+"|"
				}
			}
		}
	});
};


function transpose_ranges(point_arr, typ) {
	//return [];
	var ranges=[];
	var item;
	var len;
	var maxLen =  modbus_max_msg_data_len / 2;
	if (typ=="bit") {
		maxLen = modbus_max_msg_data_len * 8;
	}
	for(i=0; i<point_arr.length; i++) {
		var point=point_arr[i];
		if (i==0) {
			item={};
			item["startAddr"] = point["addr"];
			item["endAddr"] = point["addr"];
			item["regCnt"] = point["regCnt"];
		}
		else {
			len = point["addr"] - item["startAddr"] + point["regCnt"];
			if (len < maxLen) {
				item["endAddr"] = point["addr"];
				item["regCnt"] = len;
			}
			else {
				ranges.push(item);
				item={};
				item["startAddr"] = point["addr"];
				item["endAddr"] = point["addr"];
				item["regCnt"] = point["regCnt"];
			}
		}
	}
	ranges.push(item);
	return ranges;
}

var modbus_max_msg_data_len = 248	// 256 bytes, take away 2 bytes because it seems to be the limit of node-modbus
var bit_cur_start_addr = 0, bit_cur_end_addr = 0
var int2Byte_cur_start_addr = 0, int2Byte_cur_end_addr = 0
var int4Byte_cur_start_addr = 0, int4Byte_cur_end_addr = 0
var float4Byte_cur_start_addr = 0, float4Byte_cur_end_addr = 0
var string_cur_start_addr = 0, string_cur_end_addr = 0


var bitIndex=0;
function read_register_bit(cb) {
	if ("bit" in point_data)
	{
		var ranges=bitRanges;
		var i = bitIndex;
		var item = ranges[i];
		logr.write_to_console(__filename, __line, '----------> bitRanges:'+(typeof item)+'...|||'+JSON.stringify(item));
		bit_cur_start_addr = item.startAddr;
		bit_cur_end_addr = item.endAddr;

		tmr = setTimeout( function () {

			var regCnt = item.regCnt;

			logr.write_to_console(__filename, __line, 'bit:bit_cur_start_addr:'+bit_cur_start_addr+', bit_cur_end_addr:'+bit_cur_end_addr+', regCnt:'+regCnt)
			client.readCoils(bit_cur_start_addr, regCnt).then(function (resp) {
				logr.write_to_console(__filename, __line, '----------> read_register_bit:');
				logr.write_to_console(__filename, __line, resp);
				store_register_bit(resp)
				fs.writeFile( './point_data.json', JSON.stringify(point_data, null, '\t'), 'utf8', null );
				clearTimeout(tmr);

				bitIndex += 1;
				if (bitIndex>=ranges.length) {
					bitIndex=0;
					cb()
				}
				else {
					read_register_bit(cb);
				}
			})
			.error(function (err) {
				logr.write_to_console(__filename, __line, 'Yee-Haw: We may have a break!');
			})
		}, 10)
	}
	else
	{
		cb()
	}
}

function read_register_bit2(cb) {
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
	logr.write_to_console(__filename, __line, 'srf:'+ bit_cur_start_addr + ',' + bit_cur_end_addr)
	var pointsInRange = jpath.filter(point_data, "bit.point[addr>="+bit_cur_start_addr+" && addr<="+bit_cur_end_addr+"]")
	if (pointsInRange.length==0) {
		return
	}

	for (var pt of pointsInRange)
	{
		logr.write_to_console(__filename, __line, 'srf:'+ pt.addr + ',' + resp.coils[pt.addr - bit_cur_start_addr] )
		
		res = resp.coils[pt.addr - bit_cur_start_addr]
		if ("value" in pt)
		{
			pt.value = res
		}
		else
		{
			pt["value"] = res
		}
	}
}

function store_register_bit2(resp) {
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

var int2ByteIndex=0;
function read_register_int2Byte(cb) {
	if ("int2Byte" in point_data)
	{
		var ranges=int2ByteRanges;
		var i = int2ByteIndex;
		var item = ranges[i];
		logr.write_to_console(__filename, __line, '----------> int2ByteRanges:'+(typeof item)+'...|||'+JSON.stringify(item));
		int2Byte_cur_start_addr = item.startAddr;
		int2Byte_cur_end_addr = item.endAddr;

		tmr = setTimeout( function () {

			var regCnt = item.regCnt;

			logr.write_to_console(__filename, __line, 'int2Byte:int2Byte_cur_start_addr:'+int2Byte_cur_start_addr+', int2Byte_cur_end_addr:'+int2Byte_cur_end_addr+', regCnt:'+regCnt)
			client.readHoldingRegisters(int2Byte_cur_start_addr, regCnt).then(function (resp) {
				logr.write_to_console(__filename, __line, '----------> read_register_int2Byte:');
				store_register_int2Byte(resp)
				fs.writeFile( './point_data.json', JSON.stringify(point_data, null, '\t'), 'utf8', null );
				clearTimeout(tmr);

				int2ByteIndex += 1;
				if (int2ByteIndex>=ranges.length) {
					int2ByteIndex=0;
					cb()
				}
				else {
					read_register_int2Byte(cb);
				}
			})
			.error(function (err) {
				logr.write_to_console(__filename, __line, 'Yee-Haw: We may have a break!');
			})
		}, 10)
	}
	else
	{
		cb()
	}
}

function read_register_int2Byte2(cb) {
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
	logr.write_to_console(__filename, __line, 'srf:'+ int2Byte_cur_start_addr + ',' + int2Byte_cur_end_addr)
	var pointsInRange = jpath.filter(point_data, "int2Byte.point[addr>="+int2Byte_cur_start_addr+" && addr<="+int2Byte_cur_end_addr+"]")
	if (pointsInRange.length==0) {
		return
	}

	for (var pt of pointsInRange)
	{
		logr.write_to_console(__filename, __line, 'srf:'+ pt.addr + ',' + resp.register[pt.addr - int2Byte_cur_start_addr] )
		
		res = resp.register[pt.addr - int2Byte_cur_start_addr]
		if ("value" in pt)
		{
			pt.value = res
		}
		else
		{
			pt["value"] = res
		}
	}
}

function store_register_int2Byte2(resp) {
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

var int4ByteIndex=0;
function read_register_int4Byte(cb) {
	if ("int4Byte" in point_data)
	{
		var ranges=int4ByteRanges;
		var i = int4ByteIndex;
		var item = ranges[i];
		logr.write_to_console(__filename, __line, '----------> int4ByteRanges:'+(typeof item)+'...|||'+JSON.stringify(item));
		int4Byte_cur_start_addr = item.startAddr;
		int4Byte_cur_end_addr = item.endAddr;

		tmr = setTimeout( function () {

			var regCnt = item.regCnt;

			logr.write_to_console(__filename, __line, 'int4Byte:int4Byte_cur_start_addr:'+int4Byte_cur_start_addr+', int4Byte_cur_end_addr:'+int4Byte_cur_end_addr+', regCnt:'+regCnt)
			client.readHoldingRegisters(int4Byte_cur_start_addr, regCnt).then(function (resp) {
				logr.write_to_console(__filename, __line, '----------> read_register_int4Byte:');
				store_register_int4Byte(resp)
				fs.writeFile( './point_data.json', JSON.stringify(point_data, null, '\t'), 'utf8', null );
				clearTimeout(tmr);

				int4ByteIndex += 1;
				if (int4ByteIndex>=ranges.length) {
					int4ByteIndex=0;
					cb()
				}
				else {
					read_register_int4Byte(cb);
				}
			})
			.error(function (err) {
				logr.write_to_console(__filename, __line, 'Yee-Haw: We may have a break!');
			})
		}, 10)
	}
	else
	{
		cb()
	}
}

function read_register_int4Byte2(cb) {
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
	logr.write_to_console(__filename, __line, 'srf:'+ int4Byte_cur_start_addr + ',' + int4Byte_cur_end_addr)
	var pointsInRange = jpath.filter(point_data, "int4Byte.point[addr>="+int4Byte_cur_start_addr+" && addr<="+int4Byte_cur_end_addr+"]")
	if (pointsInRange.length==0) {
		return
	}

	for (var pt of pointsInRange)
	{
		logr.write_to_console(__filename, __line, 'srf:'+ pt.addr + ',' + resp.register[pt.addr - int4Byte_cur_start_addr] + ',' + resp.register[pt.addr - int4Byte_cur_start_addr + 1])
		
		res = cvtr.uint16ToInt(resp.register[pt.addr - int4Byte_cur_start_addr], resp.register[pt.addr - int4Byte_cur_start_addr + 1])
		if ("value" in pt)
		{
			pt.value = res
		}
		else
		{
			pt["value"] = res
		}
	}
}

function store_register_int4Byte2(resp) {
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

var float4ByteIndex=0;
function read_register_float4Byte(cb) {
	if ("float4Byte" in point_data)
	{
		var ranges=float4ByteRanges;
		var i = float4ByteIndex;
		var item = ranges[i];
		logr.write_to_console(__filename, __line, '----------> float4ByteRanges:'+(typeof item)+'...|||'+JSON.stringify(item));
		float4Byte_cur_start_addr = item.startAddr;
		float4Byte_cur_end_addr = item.endAddr;

		tmr = setTimeout( function () {

			var regCnt = item.regCnt;

			logr.write_to_console(__filename, __line, 'float4Byte:float4Byte_cur_start_addr:'+float4Byte_cur_start_addr+', float4Byte_cur_end_addr:'+float4Byte_cur_end_addr+', regCnt:'+regCnt)
			client.readHoldingRegisters(float4Byte_cur_start_addr, regCnt).then(function (resp) {
				logr.write_to_console(__filename, __line, '----------> read_register_float4Byte:');
				logr.write_to_console(__filename, __line, '----------> read_register_float4Byte:'+(typeof resp)+'...|||'+JSON.stringify(resp));
				store_register_float4Byte(resp)
				fs.writeFile( './point_data.json', JSON.stringify(point_data, null, '\t'), 'utf8', null );
				clearTimeout(tmr);

				float4ByteIndex += 1;
				if (float4ByteIndex>=ranges.length) {
					float4ByteIndex=0;
					cb()
				}
				else {
					read_register_float4Byte(cb);
				}
			})
			.error(function (err) {
				logr.write_to_console(__filename, __line, 'Yee-Haw: We may have a break!');
			})
		}, 10)
	}
	else
	{
		cb()
	}
}

function read_register_float4Byte2(cb) {
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

			var pointsInRange = jpath.filter(point_data, "float4Byte.point[addr>="+float4Byte_cur_start_addr+" && addr<="+float4Byte_cur_end_addr+"]")
			logr.write_to_console(__filename, __line, '---------->float4Byte blank zone '+pointsInRange.length)
			if (pointsInRange.length==0) {
				//logr.write_to_console(__filename, __line, '---------->float4Byte blank zone string:'+(typeof blankObj)+'...|||'+JSON.stringify(blankObj)+'|||'+JSON.stringify(string_resp)+'|||...'+(typeof string_resp));

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
			}
			else {
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
					logr.write_to_console(__filename, __line, 'Yee-Haw: We may have a break!');
				})
			}
		}, 10)
	}
	else
	{
		cb()
	}
}

function store_register_float4Byte(resp) {
	logr.write_to_console(__filename, __line, 'srf:'+ float4Byte_cur_start_addr + ',' + float4Byte_cur_end_addr)
	var pointsInRange = jpath.filter(point_data, "float4Byte.point[addr>="+float4Byte_cur_start_addr+" && addr<="+float4Byte_cur_end_addr+"]")
	if (pointsInRange.length==0) {
		return
	}

	for (var pt of pointsInRange)
	{
		logr.write_to_console(__filename, __line, 'srf:'+ pt.addr + ',' + resp.register[pt.addr - float4Byte_cur_start_addr] + ',' + resp.register[pt.addr - float4Byte_cur_start_addr + 1])
		
		res = cvtr.uint16ToFloat32(resp.register[pt.addr - float4Byte_cur_start_addr], resp.register[pt.addr - float4Byte_cur_start_addr + 1])
		if ("value" in pt)
		{
			pt.value = res
		}
		else
		{
			pt["value"] = res
		}
	}
}

function store_register_float4Byte2(resp) {
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



var stringIndex=0;
function read_register_string(cb) {
	if ("string" in point_data)
	{
		var ranges=stringRanges;
		var i = stringIndex;
		var item = ranges[i];
		logr.write_to_console(__filename, __line, '----------> stringRanges:'+(typeof item)+'...|||'+JSON.stringify(item));
		string_cur_start_addr = item.startAddr;
		string_cur_end_addr = item.endAddr;

		tmr = setTimeout( function () {

			var regCnt = item.regCnt;

			logr.write_to_console(__filename, __line, 'string:string_cur_start_addr:'+string_cur_start_addr+', string_cur_end_addr:'+string_cur_end_addr+', regCnt:'+regCnt)
			client.readHoldingRegisters(string_cur_start_addr, regCnt).then(function (resp) {
				logr.write_to_console(__filename, __line, '----------> read_register_string:');
				logr.write_to_console(__filename, __line, '----------> read_register_string:'+(typeof resp)+'...|||'+JSON.stringify(resp));
				store_register_string(resp)
				fs.writeFile( './point_data.json', JSON.stringify(point_data, null, '\t'), 'utf8', null );
				clearTimeout(tmr);

				stringIndex += 1;
				if (stringIndex>=ranges.length) {
					stringIndex=0;
					cb()
				}
				else {
					read_register_string(cb);
				}
			})
			.error(function (err) {
				logr.write_to_console(__filename, __line, 'Yee-Haw: We may have a break!');
			})
		}, 10)
	}
	else
	{
		cb()
	}
}

// The structure of buffer: {"type":"Buffer","data":[32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,84,49,49,48,32,32,32,32,32,32,32,32,84,49,49,49,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32]}
function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}
function fillString(value, len) {
  var str = "";
  for (var i = 0; i < len; i++) {
    str = str + (value);
  }
  return str;
}
function buildBlankBuffer(value, len) {
  //var arr = fillArray(value, len);
  var arr = fillString(value, len);
  var obj = new Buffer(arr);
  return obj;
}

var string_resp = null
function read_register_string1(cb) {
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

			var pointsInRange = jpath.filter(point_data, "string.point[addr>="+string_cur_start_addr+" && addr<="+string_cur_end_addr+"]")
			logr.write_to_console(__filename, __line, '----------> blank zone '+pointsInRange.length)
			if (pointsInRange.length==0) {
				//var blankObj = buildBlankBuffer(32, (regCnt*2))
				var blankObj = buildBlankBuffer(" ", (regCnt*2))
				//logr.write_to_console(__filename, __line, '----------> blank zone string:'+(typeof blankObj)+'...|||'+JSON.stringify(blankObj)+'|||'+JSON.stringify(string_resp)+'|||...'+(typeof string_resp));
				string_resp = Buffer.concat([string_resp, blankObj])
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
			}
			else {
				client.readHoldingRegisters(string_cur_start_addr, regCnt).then(function (resp) {
					//logr.write_to_console(__filename, __line, '----------> read_register_string:'+(typeof resp.payload)+'...|||'+JSON.stringify(resp.payload)+'|||'+JSON.stringify(string_resp)+'|||...'+(typeof string_resp));
					logr.write_to_console(__filename, __line, '----------> read_register_string:'+(typeof resp)+'...|||'+JSON.stringify(resp));
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
			}
		}, 10)
	}
	else
	{
		cb()
	}
}

function read_register_string2(cb) {
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


function store_register_string(resp) {
	var pointsInRange = jpath.filter(point_data, "string.point[addr>="+string_cur_start_addr+" && addr<="+string_cur_end_addr+"]")
	if (pointsInRange.length==0) {
		return
	}

	dbgmsg = ''
	for (var pt of pointsInRange)
	{
		var start = (pt.addr - string_cur_start_addr) * 2
		var end = start + (pt.regCnt * 2)
		var res = resp.payload.toString('utf8', start, end).replace(/\0/g, '')

		if ("value" in pt)
		{
			pt.value = res
		}
		else
		{
			pt["value"] = res
		}
		dbgmsg += 'C:('+pt.addr + ',' + start + ',' + end + ',' + pt.value + ')\n'
	}
	logr.write_to_console(__filename, __line, dbgmsg)
}

function store_register_string1(resp) {
	var maxSteps = string_cur_end_addr - string_cur_start_addr + 1;
	var ti = 0;
	var i = string_cur_start_addr;
	var dbgmsg = ''
	while (i <= string_cur_end_addr) {
		var pt = jpath.filter(point_data, "string.point[addr="+i+"]")
		if (pt != '')
		{
			var start = (pt[0].addr - string_cur_start_addr) * 2
			var end = start + (pt[0].regCnt * 2)
			var res = resp.payload.toString('utf8', start, end).replace(/\0/g, '')
			if ("value" in pt[0])
			{
				pt[0].value = res
			}
			else
			{
				pt[0]["value"] = res
			}
			dbgmsg += 'C:('+pt[0].addr + ',' + start + ',' + end + ',' + pt[0].value + ')\n'
			i += pt[0].regCnt;
		}
		ti += 1;
		if ( ti > maxSteps ) 
		{
			break;
		}
	}
	logr.write_to_console(__filename, __line, dbgmsg)
}

function store_register_string2() {
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
		logr.write_to_console(__filename, __line, 'retrieve_point_data done', 1)
		cb(point_data)
		set_retrieve_status(true)
	})
};


function map_point_data(x) {
	Object.keys(x).forEach(function(key) {
		logr.write_to_console(__filename, __line, 'k:'+ key + ',x:'+x);
		var value = x[key];

		if ('object' == typeof(value))
		{
			if ( ("type" in value) && ("addr" in value) && ("regCnt" in value) )
			{
				// replace the object with actual value from point_data
				if (value.type != '' && value.addr != -1)
				{
					var res = point_val(value.type, value.addr);
					if ( res.length == 0 ) 
					{
						x[key] = "";
					}
					else
					{
						x[key] = res[0];
					}
				}
			}
			else
			{
				map_point_data(value);
			}
		}
		else
		{
			//return
		}
	});
}

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
	var pts=point_data[pt_type].point;
	for (var pt of pts)
	{
		if ( pt.addr == pt_addr )
		{
			return [pt.value];
		}
	}
	return [];
	
	//return jpath.filter(point_data, pt_type + ".point[addr=" + pt_addr + "].value")
}

function clear_transposed_data() {
	point_data = {}
	addr_data = {}
	addr_data_string = "";
}

function set_retrieve_status(flag) {
	done_flag = flag
}

function get_retrieve_status() {
	return done_flag
}

module.exports = {
	get_retrieve_status: get_retrieve_status,
	set_retrieve_status: set_retrieve_status,
	transpose_from_file: transpose_from_file,
	transpose: transpose,
	retrieve_point_data: retrieve_point_data,
	map_point_data: map_point_data,
	point_val: point_val,
	clear_transposed_data: clear_transposed_data
}
