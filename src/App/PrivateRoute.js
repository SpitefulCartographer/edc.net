import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../shared/AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth() 

    /** If a user is not logged in and attempts to access thier dashboard,
     * this PrivateRoute will automatically redirect them to the login page.
     */
    return (
        <Route {...rest} render={props => {
            /** Pass the component and its props to the dashboard if a user is logged in */
           return currentUser ? <Component {...props}/> : <Redirect to="/login"/>
        }}>  
        </Route>
    )
}
