import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Offers() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)

    const params = useParams()

    useEffect(() => {
        const fetchListings = async () => {
            try {
                //get reference
                const listingsRef = collection(db, 'listings')

                //create a query
                const q = query(listingsRef, where('offer', '==', true), //remove this orderBy then okay alr orderBy('timestamp', 'desc'), //
                    limit(10)
                )

                //executing the query
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length - 1] //get the last index of the docs
                setLastFetchedListing(lastVisible)

                const listings = []

                querySnap.forEach((doc) => {
                    return listings.push({
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
    }, [])

    //Pagination / load more 
    const onFetchMoreListings = async () => {
        try {
            //Get reference 
            const listingsRef = collection(db, 'listings') //this will take in our db and the collection 'listings'

            //create a query (this will look in the url in App.js)
            const q = query(listingsRef, where('offer', '==', true), //remove this orderBy then okay alr orderBy('timestamp', 'desc'), //
                startAfter(lastFetchedListing), limit(10)
            )
            //executing the query
            const querySnap = await getDocs(q)

            const lastVisible = querySnap.docs[querySnap.docs.length - 1] //get the last index of the docs
            setLastFetchedListing(lastVisible)

            //initialise the array
            let listings = []

            querySnap.forEach((doc) => {
                return listings.push({ //push it into the array
                    id: doc.id,
                    data: doc.data()
                })
            })

            setListings((prevState) => [...prevState, ...listings])
            setLoading(false)
        } catch (error) {
            toast.error('Could not fetch listings')
        }
    }


    return (
        <div className='category'>
            <header>
                <p className="pageHeader">
                    Offers
                </p>
            </header>

            {loading ? <Spinner /> : listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className="categoryListings">
                            {listings.map((listing) => (
                                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                            ))}
                        </ul>
                    </main>
                    <br />
                    <br />
                    {lastFetchedListing && (
                        <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
                    )}

                </>
            ) : (
                <p>There are not current offers </p>
            )}
        </div>
    )
}

export default Offers