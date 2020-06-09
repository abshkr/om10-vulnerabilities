const Pool = require('pg').Pool

// TODO: Store credential elsewhere?
const pool = new Pool({
  user: 'omega',
  host: 'localhost',
  database: 'messages',
  password: 'sysv32',
  port: 5432
});

const run_sql = (request, response) => {
	// TODO: Santize the SQL string first

	try
	{
		pool.query(request, (error, results) => {
			if (error) {
				//throw error;
				console.error('pgerr');
				console.error(error);
				//response([false,error.detail]);
				response({'ok':false, 'result':error.detail});
			}
			else
			{
				//console.log(results.rows);
				if (typeof results !== 'undefined' && results != '')
				{
					//response([true,results.rows]);
					response({'ok':true, 'result':results.rows});
				}
				else
				{
					//response([false,"no data"]);
					response({'ok':false, 'result':'no data'});
				}
			}
		});
	}
	catch (err)
	{
		console.error('err:'+err.message);
		//response([false,err.message]);
		response({'ok':false, 'result':err.message});
	}
};



module.exports = {
	run_sql: run_sql
}
