import { getAuth } from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Profile() {
    //initialise the auth
    const auth = getAuth()
    //initialise the user
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })//set the object 

    //rmb to destructure and take the name and email from the formData
    const { name, email } = formData

    //use the useNavigate hook 
    const navigate = useNavigate()

    //create the onLogout function
    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }


    return <div className='profile'>
        <header className="profileHeader">
            <p className="pageHeader">My Profile</p>
            <button type='button' className="logOut" onClick={onLogout}>
                Logout
            </button>

        </header>
    </div>
}

export default Profile