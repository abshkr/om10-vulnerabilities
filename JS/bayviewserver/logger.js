var path = require('path');

Object.defineProperty(global, '__stack', {
  get: function(){
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, '__line', {
  get: function(){
    return __stack[1].getLineNumber();
  }
});


function write_to_console(filenm, linenum, msg, level=5) {
	if ( level >= 5 ) {
		return
	}
	now = new Date()
	console.log(now.toISOString() + ' (' + path.basename(filenm) + ',' + linenum + '): \n\t' + msg)
}


function write_to_omega_log(filenm, linenum, msg) {
	const execSync = require('child_process').execSync;
	/* command = "/usr/omega/bin/jentry -e COMMS -m " + "\"" + jnlmsg + "\"" */
	exe_cmd = '/usr/omega/bin/jentry'
	evt_cmd = '-e ' + 'COMMS'
	msg_cmd = '-m ' + '"' + msg + '"'
	cmd = exe_cmd + ' ' + evt_cmd + ' ' + msg_cmd
	var res = ''
	try
	{
		res = execSync(cmd);
	}
	catch (ex)
	{
		logr.write_to_console(__filename, __line, ex.message)
	}
}

module.exports = {
	write_to_console: write_to_console,
	write_to_omega_log: write_to_omega_log
}
