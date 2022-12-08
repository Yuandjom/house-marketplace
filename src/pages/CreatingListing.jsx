import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function CreatingListing() {
    const [geolocationEnabled, setGeolocationEnabled] = useState(true)
    const [loading, setLoading] = useState(false)
    //initialise the formdata state
    const [formData, setFormData] = useState({ //pass in an object with multiple fields
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0
    })

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        //check for isMounted(this is to prevent the memory leak)
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({
                        ...formData, //set it across the current form data
                        userRef: user.uid,
                    })
                } else { //if no user, we redirect to the sign in page
                    navigate('/sign-in')
                }
            })
        }

        return () => {
            isMounted.current = false
        }
    }, [isMounted])

    if (loading) {
        return <Spinner />
    }

    return (
        <div>Create</div>
    )
}

export default CreatingListing