import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
const usersColRef = db.collection("users")
const usernamesColRef = db.collection("usernames")

const AuthContext = React.createContext()

export function useAuth() { return useContext(AuthContext) }

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password, username) {
    /** Returns a promise that is used in SignUp.js 
     * Creates a user with the provided email and password
     * and sets the user's display name to the username.
     * The user's information is then written to the Firestore 
     * "users" collection.
    */
    let u = username.trim().toLowerCase()

    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({ displayName: username })

        usernamesColRef.doc(u)
        .set({
          uid: result.user.uid
        })

        usersColRef.doc(result.user.uid)
          .set({
            email: email,
            username: username
          })

      })
      .catch((e) => {
        console.log(e);
      })

  }

  function verification() {
    return auth.currentUser.sendEmailVerification()
  }

  function login(email, password) {
    /** Returns a promise that is used in LogIn.js */
    return auth.signInWithEmailAndPassword(email, password)
      .catch((e) => {
        return Promise.reject({ status: 400, code: "VERIFICATION_FAILED" })
      })
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