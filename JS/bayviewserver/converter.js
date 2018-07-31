function uint16ToFloat32(low, high) {
  var buffer = new ArrayBuffer(4);
  var intView = new Uint16Array(buffer);
  var floatView = new Float32Array(buffer);

  intView[0] = low;
  intView[1] = high;
  return parseFloat(floatView[0]);
}

function float32ToUint16(value) {
  var buffer = new ArrayBuffer(4);
  var intView = new Uint16Array(buffer);
  var floatView = new Float32Array(buffer);

  floatView[0] = value;
  return [intView[0], intView[1]];
}

function intToUint16(value) {
  var buffer = new ArrayBuffer(4);
  var intView = new Uint16Array(buffer);

  intView[0] = value & 0x0000ffff;
  intView[1] = (value & 0xffff0000) >> 16;
  return [intView[0], intView[1]];
}

function uint16ToInt(low, high) {
  var buffer = new ArrayBuffer(4);
  var intView = new Uint16Array(buffer);
  var intView2 = new Int32Array(buffer);

  intView[0] = low;
  intView[1] = high;
  return parseInt(intView2);
}


module.exports = {
	uint16ToFloat32: uint16ToFloat32,
	float32ToUint16: float32ToUint16,
	intToUint16: intToUint16,
	uint16ToInt: uint16ToInt
}
