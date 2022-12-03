import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ //remember that {} is an object but you still need to define the object inside 
        //formData will contain the email and password and also name for SignUp 
        name: '',
        email: '',
        password: '',
    })

    const onChange = (e) => { //this is to handle the event change 
        setShowPassword((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value //change the id based on the target value 
        }))
    }

    //destructure the form 
    const { name, email, password } = formData
    //define the useNavigate 
    const navigate = useNavigate()

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">
                        Welcome Back!
                    </p>
                </header>
                <main>
                    <form>
                        <input
                            type="text"
                            className="nameInput"
                            placeholder='Name'
                            id='name'
                            value={name}
                            onChange={onChange}
                        />
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

                        <div className="signUpBar">
                            <p className="signUpText">
                                Sign Up
                            </p>
                            <button className="signInButton">
                                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                            </button>
                        </div>
                    </form>
                    {/*Google OAuth */}
                    <Link to='/sign-in' className='registerLink'>
                        Sign in Instead
                    </Link>
                </main>
            </div>
        </>
    )

}

export default SignUp