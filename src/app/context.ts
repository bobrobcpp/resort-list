'use client';

import { createContext } from 'react';
import { HotelData } from './home/types';

interface HotelListingsContextType {
    sortedListings: HotelData[];
    callback: (method: string) => void;
}
export const ResortListingsContext = createContext<HotelListingsContextType>({ sortedListings: [], callback: () => { } });