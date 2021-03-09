import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../shared/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function LogIn() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const { login } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
  const history = useHistory("")

	async function handleSubmit(e) {
		/** Prevent the component from refreshing */
		e.preventDefault()

		try {
			setError("")
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
		} catch {
			setError("Failed to login")
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-2">Log In</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email Address</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Button className="w-100" type="submit" disabled={loading}>Log In</Button>
					</Form>
                    <div className="text-center mt-3">
                        <Link to="/password-reset">Forgot your password? Reset it here.</Link>
                    </div>
				</Card.Body>
			</Card>
			<div className="text-center">
				Don't have an account? <Link to="/signup">Sign up with us here.</Link>
			</div>
		</>
	)
}
