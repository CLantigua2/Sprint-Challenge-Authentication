import React, { Component } from 'react';
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Jokes from './components/Jokes';

import './App.css';

class App extends Component {
	render() {
		const token = localStorage.getItem('token');
		return (
			<div className="App">
				<nav>
					<NavLink to="/">Home</NavLink>
					<NavLink to="/">Login</NavLink>
					<NavLink to="/">Register</NavLink>
				</nav>
				<Switch>
					<Route exact path="/" render={(props) => <Jokes {...props} />} />
					<Route exact path="/" render={(props) => <Signup {...props} />} />
					<Route exact path="/" render={(props) => <Signin {...props} />} />
				</Switch>

				{token ? (
					<button
						onClick={() => {
							localStorage.removeItem('token');
							window.location.reload();
						}}
					>
						Logout
					</button>
				) : null}
			</div>
		);
	}
}

export default withRouter(App);
