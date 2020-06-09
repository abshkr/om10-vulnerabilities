import React, { Component } from 'react';
import './Login.css';
import cookie from 'js-cookie';

class Login extends Component {
	constructor(props)
	{
		super(props);

		this.state = {
			email : '',
			password: '',
			isAuth: false,
			authMsg: this.props.authMsg,
			timeout: this.props.timeout
		};

		this.onLogin = this.onLogin.bind(this);
		this.onSignup = this.onSignup.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

/*
	componentWillReceiveProps(nextProps)
	{
		if (this.props.timeout !== nextProps.timeout)
		{
			this.setState({ timeout: nextProps.timeout });  
		}
	}
*/
	static getDerivedStateFromProps(nextProps, prevState)
	{
		var res = {};
		if (nextProps.timeout !== prevState.timeout)
		{
			res['timeout'] = nextProps.timeout;  
		}

		return res;
	}

	handleInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	
	authenticate()
	{
		/* NOTE: The entered password is in plain text. Refer to notes in backend's restapi.js for explanations */

		/* var url = process.env.REACT_APP_API_URL + '/authenticate';*/
		var url = 'https://10.2.20.53:8000/authenticate';
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}).then(response => {
//			response.json().then(body => {
				this.setState({email: '', password: ''});	
				if (response.ok)
				{
// TODO: how to enforce authentication only after cookie expire
//					this.setState({isAuth: true, timeout: false});
//					var duration = cookie.get('alive');
//					console.log('duration:'+duration);
					this.props.auth(true);
				}
				else
				{
					//console.error(response);
					//alert('Error: '+ response.statusText + '\nPlease try again.');
					this.setState({isAuth: false, authMsg: response.statusText});
					this.props.auth(false);
				}
//			})
		})
		.catch(err => {
			console.error(err);
			alert('Error occurred during log in, please try again');
		});
	}

	onLogin = (event) => {
		event.preventDefault();

		this.authenticate();
	}

	onSignup = (event) => {
		event.preventDefault();

		var url = process.env.REACT_APP_API_URL + '/register';
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: { 'Content-Type': 'application/json' }
		}).then(response => {
			response.json().then(body => {
				if (response.ok)
				{
					this.setState({email: '', password: ''});	
					alert('Sign up successful. Please proceed to Log In.');
				}
				else
				{
					console.error(body.message);
					alert('Error: '+ body.message + '\nPlease try again.');
				}
			});
		})
		.catch(err => {
			console.error(err);
			alert('Error occurred during sign up, please try again');
		});
	}

	render()
	{
		if (this.state.isAuth)
		{
			return (<p>Login successful</p>);
		}
		else
		{
			var notice = '';
			if (this.state.timeout)
			{
				notice = (
					<div>
						<hr className="separator"/>
						<div>
							<p id="notice" className="notice">Session expired. Please log in again.</p>
						</div>
					</div>
				);
			}
			else
			{
				notice = (
					<div>
						<hr className="separator"/>
						<div>
							<p id="notice" className="notice">{this.state.authMsg}</p>
						</div>
					</div>
				);
			}

			var html = (
				<div>
					<div>&nbsp;</div>
					<div className="adjacent">
						<div className="spacer">&nbsp;</div>
						<div id="login" className="login shadow">
							<form>
								<h1>Central Hostcomm</h1>
								<input
									className="formInput"
									type="email"
									name="email"
									placeholder="Enter email"
									value={this.state.email}
									onChange={this.handleInputChange}
									required />
								<hr/>
								<input
									className="formInput"
									type="password"
									name="password"
									placeholder="Enter password"
									value={this.state.password}
									onChange={this.handleInputChange}
									required />
								<hr/>
{/*
								<input type="submit" value="Log in"/>
*/}
							</form>
							<div className="adjacent">
								<button id="loginButton" className="loginButton" onClick={this.onLogin}>Log In</button>
								<p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</p>
								<button id="signupButton" className="signupButton" onClick={this.onSignup}>Sign Up</button>
							</div>
							<div>{notice}</div>
						</div>
						<div className="spacer">&nbsp;</div>
					</div>
				</div>
			);

			return (html);
		}
	}
}


export default Login;
