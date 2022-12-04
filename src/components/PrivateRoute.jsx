import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'
const PrivateRoute = () => {
    //destructure from useAuthStatus
    const { loggedIn, checkingStatus } = useAuthStatus()

    if (checkingStatus) {
        return <Spinner />
    }
    //Outlet let us return the child elements
    return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute