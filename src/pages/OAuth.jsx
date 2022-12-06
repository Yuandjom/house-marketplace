import { waitForPendingWrites } from 'firebase/firestore'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'
import { async } from '@firebase/util'

function OAuth() {
    //initialised the hooks
    const navigate = useNavigate()
    const location = useLocation()

    //when u fire off the function, it has to be async
    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            //note that sign in with popout returns a response
            const result = await signInWithPopup(auth, provider)
            //result will be an object
            const user = result.user

            //Check for user
            //doc takes in 3 things, the database, the name of the collection which is users, 
            //and the userid
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            //if user, doesnt exist, create user
            if (!docSnap.exists()) {
                //setDoc has two parameters
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')

        } catch (error) {
            toast.error('Could not authorize with Google')
        }
    }

    return ( //look at the location pathname 
        <div className='socialLogin'>
            <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'}
                with
            </p>
            <button className="socialIconDiv" onClick={onGoogleClick}>
                <img className='socialIconImg' src={googleIcon} alt='google' />
            </button>
        </div>
    )
}

export default OAuth