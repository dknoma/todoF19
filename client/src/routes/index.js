import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Routes
import Home from '../components/home'
import BadRequest from '../components/badrequest'


// <Route exact path={'/profiles'} component={Profiles} /* Profile list route *//>
// ErrorBoundaries catch any non-event handler queries. Use try/catch for event-handlers (ex. button or onclick events)
// Can use regex to check query params. Allows app to throw a 400 Bad Request as the url would be invalid
class AppRouter extends Component {
  render() {
    return (
        <div>
			<Switch>
				<Route exact path={'/'} component={Home} /* Home route *//>
				<Route path="*" component={BadRequest} />
			</Switch>
        </div>
    )
  }
}
export default AppRouter;