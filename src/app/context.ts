'use client';

import { createContext } from 'react';
import { HotelDataProps } from './home/types';

interface HotelListingsContextType {
    sortedListings: HotelDataProps[];
    callback: (method: string) => void;
}
export const ResortListingsContext = createContext<HotelListingsContextType>({ sortedListings: [], callback: () => { } });