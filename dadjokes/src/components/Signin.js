import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';

const initialUser = {
	username: '',
	password: ''
};

export default class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: { ...initialUser },
			message: '',
			loggedIn: false
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
			axios
				.post('http://localhost:3300/api/login', this.state.user)
				.then((res) => {
					if (res.status === 201 && res.data) {
						localStorage.setItem('token', res.data.token);
						this.setState({
							user: { ...initialUser },
							loggedIn: true
						});
					} else {
						throw new Error('It broke');
					}
				})
				.catch((err) => {
					this.setState({
						message: 'Login failed',
						user: { ...initialUser }
					});
					console.log(err);
				});
		}
		e.target.reset();
	};

	render() {
		if (this.state.loggedIn) {
			return <Redirect to="/" />;
		}
		return (
			<div>
				<h1>Signin</h1>
				<StyledForm onSubmit={this.register}>
					<label>username</label>
					<input
						type="text"
						onChange={this.changeHandler}
						name="username"
						placeholder="username"
						value={this.value}
					/>
					<label>password</label>
					<input
						type="text"
						onChange={this.changeHandler}
						name="password"
						placeholder="password"
						value={this.value}
					/>
					<input type="submit" />
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
