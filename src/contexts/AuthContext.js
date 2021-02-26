import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)

	function signup(email, password, username) {
		/** Returns a promise that is used in SignUp.js 
     * Creates a user with the provided email and password
     * and sets the user's display name to the username.
    */
		return auth.createUserWithEmailAndPassword(email, password)
    .then(result => {
      result.user.updateProfile({
        displayName: username
      }).catch(error => {
        console.log(error)
      })
    })
	}

  function verification() {
    return auth.currentUser.sendEmailVerification()
  }

	function login(email, password) {
		/** Returns a promise that is used in LogIn.js */
		return auth.signInWithEmailAndPassword(email, password)
  }

	function logout() {
		return auth.signOut()
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email)
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
		signup,
    verification,
		login,
		logout,
		resetPassword
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
			{/** Childen will not be rendered until there is a user loaded */}
		</AuthContext.Provider>
	)
}