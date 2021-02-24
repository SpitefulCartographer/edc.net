import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"

export default function SignUp() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()
	const { signup } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const history = useHistory()

	async function handleSubmit(e) {
		/** Prevent the component from refreshing */
		e.preventDefault()

		if (passwordRef.current.value !== confirmPasswordRef.current.value) {
			return setError("Passwords do not match.")
		} else if (passwordRef.current.value.length < 6) {
			return setError("Password should be at least 6 characters.")
		}

		try {
			setError("")
			setLoading(true)
			await signup(emailRef.current.value, passwordRef.current.value)
			history.push("/")
		} catch {
			setError("Failed to create account")
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-2">Sign Up</h2>
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
						<Form.Group id="confirm-password">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type="password" ref={confirmPasswordRef} required />
						</Form.Group>
						<Button className="w-100" type="submit" disabled={loading}>Sign Up</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="text-center">
				Already have an account? <Link to="/login">Login here.</Link>
			</div>
		</>
	)
}
