'use client';
import { useEffect, useState } from "react";
import SortBar from "@/components/SortBar/SortBar";
import { ResortList } from "@/components/ResortList/ResortList";
import { sortedListings } from "@/utils/sortedListings";
import { ResortListingsContext } from "@/context/resortsContext";
import { HotelDataProps } from "./types";

import styles from "./page.module.css";

export default function Home() {
  const [data, setData] = useState<HotelDataProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortByMethod, setSortByMethod] = useState('price');

  useEffect(() => {
    // fetch data
    (async () => {
      try {
        const response = await fetch('https://static.onthebeach.co.uk/fe-code-test/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof TypeError) {
          if (error.name === 'AbortError') {
            // Request was aborted
            setError(error.name);
          } else {
            // Network error
            setError(error.name);
          }
        } else if (error instanceof Error) {
          setError(error.message);
        }
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
          <ResortList />
        </div>
      </ResortListingsContext.Provider>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  )
}
