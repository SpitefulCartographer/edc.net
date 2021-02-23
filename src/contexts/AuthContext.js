import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)

	function signup(email, password) {
		/** Returns a promise that is used in SignUp.js */
		return auth.createUserWithEmailAndPassword(email, password)
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})
		return unsubscribe
		/** Unsubscribe from onAuthStateChange event */
	}, [])


	const value = {
		currentUser,
		signup
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
			{/** Childen will not be rendered until there is a user loaded */}
		</AuthContext.Provider>
	)
}