/* API-based authentication using JWT stored in cookie
** Refer to file 'auth_readme' for explanation.
*/


const jwt = require('jsonwebtoken');
const secret = require('./secret.js');

const auth = function(req, res, next) {
	//console.log('verify:'+this.req.body.verify);
	if (req.body.verify)
	{
		// Express headers are auto converted to lowercase
		/*
		const token =
			req.body.token ||
			req.query.token ||
			req.headers['x-access-token'] ||
			req.headers['authorization'] ||
			req.cookies.token;
		*/
		const token = req.cookies['letmein'];
		//console.log('token:'+token);

/*
		if (!token)
		{
			//res.status(401).send('Unauthorized: No token provided');
			res.status(401).send({success: false, message: 'Missing token'});
		}
		else
*/
		{
			jwt.verify(token, secret.secret(), function(err, decoded) {
				if (err)
				{
					//res.status(401).send('Unauthorized: Invalid token');
					res.status(401).send({success: false, message: 'Invalid api token'});
				}
				else
				{
					//req.email = decoded.email;
					req.decoded = decoded;

					// TODO: check if email exists in db


					next();
				}
			});
		}
	}
	else
	{
		next();
	}
}


module.exports = auth;
