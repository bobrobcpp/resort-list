'use client';
import { useEffect, useState } from "react";

import SortBar from "./components/sortBar";
import { ResortList } from "./components/resortList";
import { HotelListingsProvider } from "../dataProvider";
import { HotelData } from "./types";

import styles from "./page.module.css";

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
      {/* <HotelListingsProvider value={{ data, setData }}> */}
      <div className={styles.contentContainer}>
        <div className={styles.sortBar}>
          {/* <SortBar /> */}
        </div>
        <ResortList {...{ data, error, loading }} />
      </div>
      {/* </HotelListingsProvider> */}
    </div>
  )
}
