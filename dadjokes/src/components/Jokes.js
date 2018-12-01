import React, { Component } from 'react';
import axios from 'axios';

class Jokes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			jokes: []
		};
	}

	componentDidMount = () => {
		this.authenticate();
	};

	authenticate = () => {
		const endpoint = 'http://localhost:3300/api/jokes';
		const token = localStorage.getItem('jwt');
		const options = {
			headers: {
				Authorization: token
			}
		};
		axios
			.get(endpoint, options)
			.then((res) => {
				console.log(res.data);
				this.setState({ jokes: res.data });
				this.props.history.push('/jokes');
			})
			.catch((err) => {
				this.props.history.push('/login');
				console.error('ERROR!!', err);
			});
	};

	render() {
		if (this.state.jokes) {
			return (
				<div>
					{this.state.jokes.map((joke) => (
						<div key={joke.id}>
							<p>{joke.setup}...</p>
							<p>...{joke.punchline}</p>
							<p>{joke.type}</p>
						</div>
					))}
				</div>
			);
		} else {
			return <h1>Access denied. Please log in.</h1>;
		}
	}
}

export default Jokes;
