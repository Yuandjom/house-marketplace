import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    collection, getDocs, query, where, orderBy, limit, startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
//bring the Spinner componenet when we are feteching
import Spinner from '../components/Spinner'

function Category() {
    //set the component level state
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

    const params = useParams()

    //we are using a single wait, so cannot use async
    useEffect(() => {
        const fetchListings = async () => {
            try {
                //Get reference 
                const listingsRef = collection(db, 'listings') //this will take in our db and the collection 'listings'

                //create a query (this will look in the url in App.js)
                const q = query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(10)) //params is the category name from the params in the url

                //executing the query
                const querySnap = await getDocs(q)

                //initialise the array
                let listings = []

                querySnap.forEach((doc) => {
                    return listings.push({ //push it into the array
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error('Could not fetch listings')
            }
        }
        fetchListings()
    }, [params.categoryName])

    return (
        <div className='category'>
            <header>
                <p className="pageHeader">
                    {params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'}
                </p>
            </header>

            {loading ?
                (<Spinner />) :
                listings && listings.length > 0 ? (
                    <>
                        <main>
                            <ul className='categoryListings'>
                                {listings.map((listing) => (
                                    {/**note that listing is a data object with an id.
                                        We are getting the name in the data object
                                        
                                        note that have to put the key here
                                    */ },
                                    <h3 key={listing.id}>{listing.data.name}</h3>
                                ))}
                            </ul>
                        </main>

                    </>
                ) : (
                    <p>No listings for {params.categoryName}</p>
                )}
        </div>
    )
}

export default Category