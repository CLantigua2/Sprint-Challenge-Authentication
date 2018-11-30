import React, { Component } from 'react';
import axios from 'axios';

const initialUser = {
	username: '',
	password: ''
};

export default class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: { ...initialUser },
			message: ''
		};
	}

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			user: { ...this.state.user, [name]: value }
		});
	};

	register = (e) => {
		e.preventDefault();

		const { username, password } = this.state.user;
		if (!username || !password) {
			alert('Please provide a username and password');
		} else {
			axios.post('http://localhost:3300/register', this.state.user).then((res) => {
				if (res.status === 201) {
					this.setState({
						message: 'Registration successful',
						user: { ...initialUser }
					});
				}
			});
		}
	};

	render() {
		const { username, password } = this.state.user;
		return (
			<div>
				<form onSubmit={this.register}>
					<input
						type="text"
						onChange={this.changeHandler}
						name="username"
						placeholder="username"
						value={username}
					/>

					<input
						type="text"
						onChange={this.changeHandler}
						name="password"
						placeholder="password"
						value={password}
					/>
					<input type="submit" />
				</form>
			</div>
		);
	}
}
