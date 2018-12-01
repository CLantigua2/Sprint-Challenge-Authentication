import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';

export default class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			message: ''
		};
	}

	// handles input change
	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	// submit handler
	register = (e) => {
		e.preventDefault();
		const { username, password } = this.state;
		if (username === '' || password === '') {
			alert('username and password required');
		} else {
			const logLink = 'http://localhost:3300/api/login';
			axios
				.post(logLink, this.state) //post username and password to the link
				.then((res) => {
					console.log(res.data);
					localStorage.setItem('jwt', res.data.token);
					this.setState({ message: `Welcome ${username}` });
				})
				.catch((err) => {
					console.error('ERROR', err);
				});
		}
	};

	render() {
		if (this.state.loggedIn) {
			return <Redirect to="/" />;
		}
		return (
			<div>
				<h1>Signin</h1>
				<StyledForm onSubmit={this.register}>
					<div>
						<label>username</label>
						<input
							type="text"
							onChange={this.changeHandler}
							name="username"
							placeholder="username"
							value={this.state.username}
						/>
					</div>
					<div>
						<label>password</label>
						<input
							type="text"
							onChange={this.changeHandler}
							name="password"
							placeholder="password"
							value={this.state.password}
						/>
					</div>
					{this.state.message === '' ? <button type="submit">Signin</button> : null}
				</StyledForm>
				{this.state.message !== '' ? <h1>{this.state.message}</h1> : null}
			</div>
		);
	}
}

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 400px;
	margin: 0 auto;
	padding: 20px;
`;
