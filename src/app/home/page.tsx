'use client';
import Image from "next/image";
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
      {data.map(({ resort }, index) => (
        <div className={styles.resortCard} key={index}>
          <Image src={resort.image.url} alt={resort.image.description} width={200} height={200} />
          <h1>{resort.name}</h1>
          <button className={styles.button}>Book now</button>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  )
}
