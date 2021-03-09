import SignUp from '../SignUp-Login/SignUp'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../shared/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import LogIn from '../SignUp-Login/LogIn'
import PrivateRoute from './PrivateRoute'
import PasswordReset from '../SignUp-Login/ForgotPassword'

function App() {
	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: "100vh" }}>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<Router>
					<AuthProvider>
						<Switch>
							<PrivateRoute exact path="/" component={Dashboard}/>
							<Route path="/signup" component={SignUp}/>
							<Route path="/login" component={LogIn}/>
							<Route path="/password-reset" component={PasswordReset}/>
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}

export default App;
