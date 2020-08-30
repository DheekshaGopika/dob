import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Navbar } from './components/layout'
import { SignUp, SignIn } from './components/auth'
import { Create, MonthContainer } from './components/months'

export default () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path='/signin' component={() => <SignIn />} />
				<Route path='/signup' component={() => <SignUp />} />
				<Route path='/profile' component={() => <h1> Profile </h1>} />
				<Route path='/jan' component={() => <MonthContainer />} />
				<Route path='/' component={() => <Create />} />
			</Switch>
		</Router>
	)
}
