import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'

function Listing() {
    //set the state of the componenet
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate() //this is the hook
    const params = useParams()
    const auth = getAuth()

    //useEffect is where you fetch and get all the listing 
    useEffect(() => {
        const fetchListing = async () => {
            //get the document reference
            const docRef = doc(db, 'listings', params.listingId) //the params id is from the url
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log(docSnap.data())
                setListing(docSnap.data())
                setLoading(false)
            }
        }
        //call the function
        fetchListing()
    }, [navigate, params.listingId])

    return (
        <div>LISTING</div>
    )
}

export default Listing