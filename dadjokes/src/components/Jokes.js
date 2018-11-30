import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

class Jokes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			jokes: null,
			loggedIn: false
		};
	}

	authenticate = () => {
		const token = localStorage.getItem('token');
		const options = {
			headers: {
				authorization: token
			}
		};
		if (token) {
			axios
				.get('https://safe-falls-22549.herokuapp.com/random_ten', options)
				.then((res) => {
					if (res.status === 200 && res.data) {
						this.setState({ loggedIn: true, jokes: res.data });
					} else {
						throw new Error();
					}
				})
				.catch((err) => {
					this.props.history.push('/login');
					console.error('ERROR!!', err);
				});
		} else {
			this.props.history.push('/login');
		}
	};

	componentDidMount = () => {
		this.authenticate();
	};

	componentDidUpdate = (prevProps) => {
		const { pathname } = this.props.history;
		if (pathname === '/' && pathname !== prevProps.history.pathname) {
			this.authenticate();
		}
	};

	render() {
		if (this.state.users) {
			return (
				<div>
					{this.state.users.map((user) => (
						<p key={user.id}>
							{user.username.charAt(0).toUpperCase() + user.username.slice(1)} works in{' '}
							{user.department.charAt(0).toUpperCase() + user.department.slice(1)}
						</p>
					))}
				</div>
			);
		} else {
			return <h1>Access denied. Please log in.</h1>;
		}
	}
}

export default withRouter(Jokes);
