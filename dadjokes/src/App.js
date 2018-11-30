import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Jokes from './components/Jokes';
// import styled from 'styled-components';

import './App.css';

class App extends Component {
	render() {
		const token = localStorage.getItem('token');
		return (
			<div className="App">
				<nav>
					<NavLink to="/" exact>
						Home
					</NavLink>
					&nbsp;|&nbsp;
					<NavLink to="/login">Login</NavLink>
					&nbsp;|&nbsp;
					<NavLink to="/signup">Register</NavLink>
				</nav>
				<main>
					<Route exact path="/" component={Jokes} />
					<Route path="/signup" component={Signup} />
					<Route path="/login" component={Signin} />
				</main>

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

export default App;
