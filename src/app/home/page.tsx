'use client';
import { useEffect, useState } from "react";
import SortBar from "./components/sortBar";
import { ResortList } from "./components/resortList";
import { ResortListingsContext } from "../context";
import { HotelDataProps } from "./types";

import styles from "./page.module.css";

export default function Home() {
  const [data, setData] = useState<HotelDataProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortByMethod, setSortByMethod] = useState('price');

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
      <ResortListingsContext.Provider value={{ sortedListings: sortedListings(data, sortByMethod), callback: setSortByMethod }}>
        <div className={styles.contentContainer}>
          <div className={styles.sortBar}>
            <SortBar />
          </div>
          <ResortList {...{ error, loading }} />
        </div>
      </ResortListingsContext.Provider>
    </div>
  )
}


const sortedListings = (listings: HotelDataProps[], sortByMethod: string) => {
  switch (sortByMethod) {
    case 'price':
      return [...listings].sort((b, a) => a.bookingDetails.price.amount - b.bookingDetails.price.amount);
    case 'starRating':
      return [...listings].sort((a, b) => a.resort.starRating - b.resort.starRating);
    case 'name':
      return [...listings].sort((a, b) => a.resort.name.localeCompare(b.resort.name));
    default:
      return [...listings];
  }
};