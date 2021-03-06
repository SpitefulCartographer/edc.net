import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../shared/AuthContext'

export default function SignUp() {
  const emailRef = useRef("")
  const usernameRef = useRef("")
  const passwordRef = useRef("")
  const confirmPasswordRef = useRef("")
  const { signup, verification } = useAuth()
  const [ error, setError ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    /** Prevent the component from refreshing */
    e.preventDefault()

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match.")
    } else if (passwordRef.current.value.length < 6) {
      return setError("Password should be at least 6 characters.")
    } else if (usernameRef.current.value.length < 4) {
      return setError("Username of at least 8 characters is required")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value, usernameRef.current.value)
    } catch {
      setError("Failed to create account")
    } finally {
      setLoading(false)
    }

    try {
      setError("")
      setLoading(true)
      await verification()
      history.push("/")
    } catch {
      setError("Failed to send verification email")
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
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" ref={usernameRef} required />
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
