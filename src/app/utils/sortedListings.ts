import { HotelDataProps } from "../resorts/types";

export const sortedListings = (listings: HotelDataProps[], sortByMethod: string) => {
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