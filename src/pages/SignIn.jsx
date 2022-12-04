import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { async } from '@firebase/util'


function SignIn() {
    //define the states
    const [showPassword, setShowPassword] = useState(false)
    //formdata object
    const [formData, setFormData] = useState({
        //default will be an object with an email 
        email: '',
        password: ''
    })

    //to use email and password, we need to destructure them from the formData
    const { email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {//passing in the event parameter
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value //change the value based on the target id
        }))
    }

    //onSubmit function
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            //initialise auth with getAuth
            const auth = getAuth()
            //return a promise
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            //check
            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            toast.error('Bad User Credentials')
        }



    }


    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">
                        Welcome Back!
                    </p>
                </header>
                <main>
                    <form onSubmit={onSubmit}>
                        <input
                            type="email"
                            className="emailInput"
                            placeholder='Email'
                            id='email'
                            value={email}
                            onChange={onChange}
                        />

                        <div className="passwordInputDiv">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="passwordInput"
                                placeholder='Password'
                                id='password'
                                value={password}
                                onChange={onChange}
                            />

                            <img src={visibilityIcon}
                                alt="show password"
                                className='showPassowrd'
                                onClick={() => setShowPassword((prevState) => !prevState)}
                            />
                        </div>

                        <Link to='/forgot-password' className='forgotPasswordLink'>
                            Forgot Password
                        </Link>

                        <div className="signInBar">
                            <p className="signInText">
                                Sign In
                            </p>
                            <button className="signInButton">
                                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                            </button>
                        </div>
                    </form>
                    {/*Google OAuth */}
                    <Link to='/sign-up' className='registerLink'>
                        Sign Up Instead
                    </Link>
                </main>
            </div>
        </>
    )
}

export default SignIn