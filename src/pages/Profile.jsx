import { getAuth } from 'firebase/auth'
import React, { useState, useEffect } from 'react'

function Profile() {
    //initialise the user
    const [user, setUser] = useState(null)//set the object 

    //initialise the auth
    const auth = getAuth()

    useEffect(() => {
        setUser(auth.currentUser)
    }, [])


    return user ? <h1>{user.displayName}</h1> : 'Not Logged In'
}

export default Profile