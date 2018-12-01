import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			message: ''
		};
	}

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	register = (e) => {
		e.preventDefault();
		const regLink = 'http://localhost:3300/api/register';
		const { username, password } = this.state;
		if (!username || !password) {
			alert('Please provide a username and password');
		} else {
			axios
				.post(regLink, { username, password })
				.then((res) => {
					if (res.status === 201) {
						this.setState({
							message: 'Registration successful',
							state: { ...this.state }
						});
					} else {
						throw new Error('its broken');
					}
				})
				.catch((err) => {
					this.setState({
						message: 'Registration failed.',
						state: { ...this.state }
					});
					console.dir(err);
				});
		}
		e.target.reset();
	};

	render() {
		return (
			<div>
				<h1>Signup</h1>
				<StyledForm onSubmit={this.register}>
					<div>
						<label htmlFor="username">username</label>
						<input
							type="text"
							onChange={this.changeHandler}
							name="username"
							placeholder="username"
							value={this.value}
						/>
					</div>
					<div>
						<label htmlFor="password">password</label>
						<input
							type="text"
							onChange={this.changeHandler}
							name="password"
							placeholder="password"
							value={this.value}
						/>
					</div>
					<button type="submit">Signup</button>
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
