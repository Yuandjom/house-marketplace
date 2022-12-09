import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
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
    //destructure the formData so we no need to say formData.sth
    const { type, name, bedrooms, bathrooms, parking, furnished, address, offer, regularPrice,
        discountedPrice, images, latitude, longitude } = formData

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

    const onSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        //to do the checks
        if (discountedPrice >= regularPrice) {
            setLoading(false)
            toast.error('Discounted price needs to be less than regular price')
            return
        }
        if (images.length > 6) {
            setLoading(false)
            toast.error('Max 6 images')
            return
        }

        //do the geocoding 
        let geolocation = {}
        let location

        if (geolocationEnabled) {
            //when u have await u need async
            const response = await fetch(``)
        } else {
            geolocation.lat = latitude
            geolocation.lng = longitude
            location = address
        }
        setLoading(false)
    }
    const onMutate = (e) => {
        let boolean = null

        //this fire off based on mouse click 
        if (e.target.value === 'true') {
            boolean = true
        }
        if (e.target.value === 'false') {
            boolean = false
        }

        //Files 
        if (e.target.files) {
            //upadte the local state
            setFormData((prevState) => ({ //this is an object to be return therefore need ({}) parenthesis ard the object
                ...prevState,
                images: e.target.files //this is the array of images
            }))
        }

        //Text/Booleans/Numbers
        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                //use the id as the key
                [e.target.id]: boolean ?? e.target.value

            }))
        }

    }

    //the loading is here from the setLoading
    if (loading) {
        return <Spinner />
    }

    return (
        <div className='profile'>
            <header>
                <p className="pageHeader">Create a Listing</p>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <label className='formLabel'>Sell / Rent</label>
                    <div className="formButtons"></div>
                    <button type='button' className={type === 'sale' ? 'formButtonActive' : 'formButton'}
                        id='type'
                        value='sale'
                        onClick={onMutate}
                    >
                        Sell
                    </button>
                    <button type='button' className={type === 'rent' ? 'formButtonActive' : 'formButton'}
                        id='type'
                        value='rent'
                        onClick={onMutate}
                    >
                        Rent
                    </button>

                    <label className='formLabel'>Name</label>
                    <input
                        className='formInputName'
                        type='text'
                        id='name'
                        value={name}
                        onChange={onMutate}
                        maxLength='32'
                        minLength='10'
                        required
                    />

                    <div className='formRooms flex'>
                        <div>
                            <label className='formLabel'>Bedrooms</label>
                            <input
                                className='formInputSmall'
                                type='number'
                                id='bedrooms'
                                value={bedrooms}
                                onChange={onMutate}
                                min='1'
                                max='50'
                                required
                            />
                        </div>
                        <div>
                            <label className='formLabel'>Bathrooms</label>
                            <input
                                className='formInputSmall'
                                type='number'
                                id='bathrooms'
                                value={bathrooms}
                                onChange={onMutate}
                                min='1'
                                max='50'
                                required
                            />
                        </div>
                    </div>
                    <label className='formLabel'>Parking spot</label>
                    <div className="formButtons">
                        <button
                            className={parking ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='parking'
                            value={true}
                            onClick={onMutate}
                        >
                            Yes
                        </button>
                        <button
                            className={!parking && parking != null ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='parking'
                            value={false}
                            onClick={onMutate}
                        >
                            No
                        </button>
                    </div>
                    <label className='formLabel'>Furnished</label>
                    <div className='formButtons'>
                        <button
                            className={furnished ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='furnished'
                            value={true}
                            onClick={onMutate}
                        >
                            Yes
                        </button>
                        <button
                            className={!furnished && furnished != null
                                ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='furnished'
                            value={false}
                            onClick={onMutate}
                        >
                            No
                        </button>

                    </div>
                    <label className='formLabel'>Address</label>
                    <textarea
                        className='formInputAddress'
                        type='text'
                        id='address'
                        value={address}
                        onChange={onMutate}
                        required
                    />

                    {!geolocationEnabled && (
                        <div className='formLating flex'>
                            <div>
                                <label className='formLabel'>Latitude</label>
                                <input
                                    className='formInputSmall'
                                    type='number'
                                    id='latitude'
                                    value={latitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>
                            <div>
                                <label className='formLabel'>Longitude</label>
                                <input
                                    className='formInputSmall'
                                    type='number'
                                    id='longitude'
                                    value={longitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>

                        </div>
                    )}
                    <label className='formLabel'>Offer</label>
                    <div className='formButtons'>
                        <button
                            className={offer ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='offer'
                            value={true}
                            onClick={onMutate}
                        >
                            Yes
                        </button>
                        <button
                            className={
                                !offer && offer !== null ? 'formButtonActive' : 'formButton'
                            }
                            type='button'
                            id='offer'
                            value={false}
                            onClick={onMutate}
                        >
                            No
                        </button>
                    </div>

                    <label className='formLabel'>Regular Price</label>
                    <div className='formPriceDiv'>
                        <input
                            className='formInputSmall'
                            type='number'
                            id='regularPrice'
                            value={regularPrice}
                            onChange={onMutate}
                            min='50'
                            max='750000000'
                            required
                        />
                        {type === 'rent' && <p className='formPriceText'>$ / Month</p>}
                    </div>

                    {offer && (
                        <>
                            <label className='formLabel'>Discounted Price</label>
                            <input
                                className='formInputSmall'
                                type='number'
                                id='discountedPrice'
                                value={discountedPrice}
                                onChange={onMutate}
                                min='50'
                                max='750000000'
                                required={offer}
                            />
                        </>
                    )}

                    <label className='formLabel'>Images</label>
                    <p className='imagesInfo'>
                        The first image will be the cover (max 6).
                    </p>
                    <input
                        className='formInputFile'
                        type='file'
                        id='images'
                        onChange={onMutate}
                        max='6'
                        accept='.jpg,.png,.jpeg'
                        multiple
                        required
                    />
                    <button type='submit' className='primaryButton createListingButton'>
                        Create Listing
                    </button>
                </form>
            </main>
        </div >
    )
}

export default CreatingListing