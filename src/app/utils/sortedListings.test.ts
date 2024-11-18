import { describe, it, expect } from 'vitest';
import { sortedListings } from './sortedListings';
import { HotelDataProps } from '../resorts/types';

const sampleListings: HotelDataProps[] = [
    {
        key: 1,
        resort: {
            id: '1',
            name: 'Zen Resort',
            regionName: 'Iberian Peninsula',
            countryName: 'Spain',
            starRating: 4,
            overview: 'A peaceful retreat.',
            image: { url: 'zen.jpg', description: 'Zen Resort Image' },
        },
        flightDetails: {
            departureAirport: 'LAX',
            departureDate: '2024-12-01',
        },
        bookingDetails: {
            party: { adults: 2, children: 0, infants: 0 },
            lengthOfStay: 5,
            price: { amount: 200, currency: 'USD' },
        },
    },
    {
        key: 2,
        resort: {
            id: '2',
            name: 'Paradise Stay',
            regionName: 'Caribbean',
            countryName: 'Bahamas',
            starRating: 5,
            overview: 'Luxury at its finest.',
            image: { url: 'paradise.jpg', description: 'Paradise Stay Image' },
        },
        flightDetails: {
            departureAirport: 'JFK',
            departureDate: '2024-12-15',
        },
        bookingDetails: {
            party: { adults: 2, children: 2, infants: 1 },
            lengthOfStay: 7,
            price: { amount: 300, currency: 'USD' },
        },
    },
    {
        key: 3,
        resort: {
            id: '3',
            name: 'Budget Inn',
            regionName: 'Europe',
            countryName: 'Italy',
            starRating: 3,
            overview: 'Affordable and cozy.',
            image: { url: 'budget.jpg', description: 'Budget Inn Image' },
        },
        flightDetails: {
            departureAirport: 'ORD',
            departureDate: '2024-11-20',
        },
        bookingDetails: {
            party: { adults: 1, children: 1, infants: 0 },
            lengthOfStay: 3,
            price: { amount: 150, currency: 'USD' },
        },
    },
];

describe('sortedListings', () => {
    it('should sort listings by price in descending order when sortByMethod is "price"', () => {
        const result = sortedListings(sampleListings, 'price');
        expect(result.map(listing => listing.bookingDetails.price.amount)).toEqual([300, 200, 150]);
    });

    it('should sort listings by star rating in ascending order when sortByMethod is "starRating"', () => {
        const result = sortedListings(sampleListings, 'starRating');
        expect(result.map(listing => listing.resort.starRating)).toEqual([3, 4, 5]);
    });

    it('should sort listings by name in alphabetical order when sortByMethod is "name"', () => {
        const result = sortedListings(sampleListings, 'name');
        expect(result.map(listing => listing.resort.name)).toEqual(['Budget Inn', 'Paradise Stay', 'Zen Resort']);
    });

    it('should return the original order when sortByMethod is not recognized', () => {
        const result = sortedListings(sampleListings, 'unknown');
        expect(result).toEqual(sampleListings);
    });

    it('should handle an empty listings array gracefully', () => {
        const result = sortedListings([], 'price');
        expect(result).toEqual([]);
    });
});