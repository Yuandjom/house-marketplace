import React from 'react'
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDoc, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase.config'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Spinner from './Spinner'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Slider() {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    const navigate = useNavigate()

    //create the useEffect to fetch the listing 
    useEffect(() => {
        //when we use await need to put in asyn function
        const fetchListings = async () => {
            const listingRef = collection(db, 'listings')
            const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5))
            const querySnap = await getDocs(q)

            let listings = []

            querySnap.forEach((doc) => { //for each document
                return listings.push({//push the elements into the array
                    id: doc.id,
                    data: doc.data()
                })
            })
            console.log(listings)
            setListings(listings)
            setLoading(false)
        }
        fetchListings()

    }, [])

    //check for loading before return 
    if (loading) {
        return <Spinner />
    }

    return listings && (
        <>
            <p className='exploreHeading'>Recommended</p>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
            >
                {listings.map(({ data, id }) => {
                    return (
                        <SwiperSlide
                            key={id}
                            onClick={() => navigate(`/category/${data.type}/${id}`)}
                        >
                            <div
                                style={{
                                    background: `url(${data.imgUrls[0]}) center no-repeat`,
                                    backgroundSize: 'cover',
                                    padding: '150px',
                                }}
                                className="swipeSlideDiv"
                            >
                                <p className="swiperSlideText">{data.name}</p>
                                <p className="swiperSlidePrice">
                                    ${data.discountedPrice ?? data.regularPrice}{' '}
                                    {data.type === 'rent' && '/month'}
                                </p>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    )
}

export default Slider