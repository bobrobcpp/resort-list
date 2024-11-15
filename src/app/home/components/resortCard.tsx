import { useState } from 'react';
import { ImArrowRight } from "react-icons/im";
import { ImArrowDown2 } from "react-icons/im";
import styles from './resort.module.css';
import Image from 'next/image';
import { formatGuestString } from '../helpers/formatGuestString';
import { useRouter } from 'next/navigation';
import { HotelDataProps } from '../types';

export const ResortCard = ({ resort, bookingDetails, flightDetails }: HotelDataProps) => {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleOnClick = () => {
        setIsExpanded(!isExpanded);
    }
    return (
        <div className={styles.resortCardContainer}>
            <div className={styles.resortCard}>
                <div className={styles.resortImageContainer}>
                    <Image src={resort.image.url} alt={resort.image.description} width={400} height={250} />
                    <button className={styles.expandableButton} onClick={handleOnClick} type='button'>{isExpanded ? 'Read less about this hotel    ' : `Read more about this hotel    `}{isExpanded ? <ImArrowDown2 /> : <ImArrowRight />}</button>
                </div>
                <div className={styles.resortInfo}>
                    <h3>{resort.name}</h3>
                    <p>{resort.regionName}, {resort.countryName}</p>
                    <p>{resort.starRating} star</p>
                    <p>{formatGuestString(bookingDetails.party.adults, bookingDetails.party.children, bookingDetails.party.infants)}</p>
                    <p>{flightDetails.departureDate} for {bookingDetails.lengthOfStay} nights </p>
                    <p>departs from {flightDetails.departureAirport}</p>
                    <button className={styles.button} type="button" onClick={() => router.push('https://www.onthebeach.co.uk/')} >Book now {bookingDetails.price.amount}</button>
                </div>
            </div>
            <div className={isExpanded ? styles.resortOverviewExpanded : styles.resortOverviewHidden}>
                <p>{resort.overview}</p>
            </div>
        </div >
    );
}
