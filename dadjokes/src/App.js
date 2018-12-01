import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Jokes from './components/Jokes';
// import styled from 'styled-components';

import './App.css';

class App extends Component {
	signout = () => {
		localStorage.removeItem('jwt');
		window.location.reload();
	};
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<nav>
						<NavLink to="/" exact>
							Home
						</NavLink>
						&nbsp;|&nbsp;
						<NavLink to="/jokes">Jokes</NavLink>
						&nbsp;|&nbsp;
						<NavLink to="/signin">Signin</NavLink>
						&nbsp;|&nbsp;
						<button onClick={this.signout}>Signout</button>
					</nav>
					<main>
						<Route path="/" component={Signup} exact />
						<Route path="/jokes" component={Jokes} />
						<Route path="/signin" component={Signin} />
					</main>
				</header>
			</div>
		);
	}
}

export default App;
