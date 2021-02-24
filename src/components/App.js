import SignUp from './SignUp'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import LogIn from './LogIn'
import PrivateRoute from './PrivateRoute'
import PasswordReset from './ForgotPassword'

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
