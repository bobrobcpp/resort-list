import { useRouter } from 'next/navigation'
import styles from "./resortList.module.css";
import { formatGuestString } from "../helpers/formatGuestString";

import Image from "next/image";
export const ResortList = ({ data, loading, error }: any) => {
  const router = useRouter()
  return (
    <div className={styles.resortListContainer}>
      <div className={styles.resortList}>
        {data.map(({ resort, flightDetails, bookingDetails }, index) => (
          <div className={styles.resortCard} key={index}>
            <Image src={resort.image.url} alt={resort.image.description} width={400} height={200} />
            <div className={styles.resortInfo}>
              <h3>{resort.name}</h3>
              <p>{resort.regionName}, {resort.countryName}</p>
              <p>{resort.starRating} star</p>
              <p>{formatGuestString(bookingDetails.party.adults, bookingDetails.party.children, bookingDetails.party.infants)}</p>
              <p>{flightDetails.departureDate} for {bookingDetails.lengthOfStay} nights </p>
              <p>departs from {flightDetails.departureAirport}</p>
              <button className={styles.button} type="button" onClick={() => router.push('https://www.onthebeach.co.uk/')} >Book now</button>
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  )
}