import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

	async function handleSubmit(e) {
		/** Prevent the component from refreshing */
		e.preventDefault()

		try {
            setMessage("")
			setError("")
			setLoading(true)
			await resetPassword(emailRef.current.value)
            setMessage("An email with instructions has been sent to your inbox.")
		} catch {
			setError("Failed to reset password")
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-2">Password Reset</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email Address</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Button className="w-100" type="submit" disabled={loading}>Reset Password</Button>
					</Form>
				</Card.Body>
                {message && <Alert varient="log">{message}</Alert>}
			</Card>
			<div className="text-center">
				<Link to="/login">Return to login here.</Link>
			</div>
		</>
	)
}
