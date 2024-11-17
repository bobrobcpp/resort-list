import { useContext } from 'react';
import { ResortCard } from '@/components/ResortCard/ResortCard';
import { ResortListingsContext } from '@/context/resortsContext';
import styles from "./resortList.module.css";

export const ResortList = ({ loading, error }: any) => {
  const data = useContext(ResortListingsContext);
  return (
    <div className={styles.resortListContainer}>
      <div className={styles.resortList}>
        {data.sortedListings.map(({ resort, flightDetails, bookingDetails }, index) => (
          <ResortCard key={index} resort={resort} flightDetails={flightDetails} bookingDetails={bookingDetails} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  )
}