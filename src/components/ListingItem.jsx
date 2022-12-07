import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bedtubIcon from '../assets/svg/bathtubIcon.svg'

//ListingItem is going to take a couple of props 
//need to destructure the props 
function ListingItem({ listing, id, onDelete }) { //how to use the prop ah?
    //note that the src img is from the database of firebase
    return (
        <li className='categoryListing'>
            <Link to={`/category/${listing.type}/${id}`}
                className='categoryListingLink'>
                <img src={listing.imageUrls[0]} alt={listing.name}
                    className='categoryListingImg' />
                <div className="categoryListingDetails">
                    <p className="categoryListingLocation">
                        {listing.location}
                    </p>
                    <p className="categoryListingName">{listing.name}</p>
                    <p className="categoryListingPrice">
                        ${listing.offer ? listing.discountedPrice : listing.regularPrice}
                        {listing.type === 'rent' && ' / Month'}
                    </p>

                    <div className="categoryListingInfoDiv">
                        <img src={bedIcon} alt="bed" />
                        <p className="categoryListingInfoText">
                            {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : `1 Bedroom`}
                        </p>
                        <img src={bedtubIcon} alt='bath' />
                        <p className="categoryListingInfoText">
                            {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `1 Bathroom`}
                        </p>
                    </div>
                </div>
            </Link>

            {onDelete && (
                <DeleteIcon className='removeIcon' fill='rgb(231, 76, 60)' onClick={
                    () => onDelete(listing.id, listing.name)
                } />
            )}

        </li>
    )
}

export default ListingItem