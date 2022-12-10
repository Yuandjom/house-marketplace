import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bedtubIcon from '../assets/svg/bathtubIcon.svg'

//ListingItem is going to take a couple of props 
//need to destructure the props 
function ListingItem({ listing, id, onEdit, onDelete }) { //how to use the prop ah?
    //note that the src img is from the database of firebase
    return (
        <li className='categoryListing'>
            <Link to={`/category/${listing.type}/${id}`}
                className='categoryListingLink'>
                <img src={listing.imgUrls[0]} alt={listing.name}
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

            {/**show if function is passed in */}
            {onDelete && (
                <DeleteIcon className='removeIcon' fill='rgb(231, 76, 60)' onClick={
                    () => onDelete(listing.id, listing.name)
                } />
            )}
            {/**show if function is passed in */}
            {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}

        </li>
    )
}

export default ListingItem