import React, { useRef } from 'react'
import { Card, Form, Button } from 'react-bootstrap'

export default function SignUp() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()
	
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-2">Sign Up</h2>
						<Form>
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
							<Button className="w-100" type="submit">Sign Up</Button>
						</Form>
					</Card.Body>
			</Card>
				<div>
					Already have an account? Login here.
            </div>
		</>
	)
}
