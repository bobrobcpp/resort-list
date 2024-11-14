'use client';
import Image from "next/image";
import { formatGuestString } from "./helpers/formatGuestString";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { HotelData } from "./types";

export default function Home() {
  const [data, setData] = useState<HotelData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://static.onthebeach.co.uk/fe-code-test/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        console.log(data, 'response.json');
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.contentContainer}>
        <div className={styles.sortBar}></div>
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
                  <button className={styles.button}>Book now</button>
                </div>
              </div>
            ))}
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  )
}
