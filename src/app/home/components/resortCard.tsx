import styles from './resort.module.css';
import Image from 'next/image';
import { formatGuestString } from '../helpers/formatGuestString';
import { useRouter } from 'next/navigation';
import { HotelDataProps } from '../types';

export const ResortCard = ({ resort, bookingDetails, flightDetails }: HotelDataProps) => {
    const router = useRouter();
    return (
        <div className={styles.resortCard}>
            <Image src={resort.image.url} alt={resort.image.description} width={400} height={200} />
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
    );
}
