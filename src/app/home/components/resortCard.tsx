import { useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
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
                    <button className={styles.expandableButton} onClick={handleOnClick} type='button'>
                        {isExpanded ? 'Read less about this hotel    ' : `Read more about this hotel    `}{isExpanded ? <ArrowDown /> : <ArrowRight />}
                    </button>
                </div>
                <div className={styles.resortInfo}>
                    <h3>{resort.name}</h3>
                    <span>{resort.regionName}, {resort.countryName}</span>
                    <span>{resort.starRating} star</span>
                    <span>{formatGuestString(bookingDetails.party.adults, bookingDetails.party.children, bookingDetails.party.infants)}</span>
                    <span>{flightDetails.departureDate} for {bookingDetails.lengthOfStay} days </span>
                    <span>departs from {flightDetails.departureAirport}</span>
                    <button className={styles.button} type="button" onClick={() => router.push('https://www.onthebeach.co.uk/')}>
                        Book now
                        <span className={styles.price}>
                            {bookingDetails.price.currency === 'GBP' ? '£' : ''}{bookingDetails.price.amount}
                        </span>
                    </button>
                </div>
            </div>
            <div className={isExpanded ? styles.resortOverviewExpanded : styles.resortOverviewHidden}>
                <h4>Overview</h4>
                <p>{resort.overview}</p>
            </div>
        </div >
    );
}
