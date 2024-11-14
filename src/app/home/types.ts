export interface HotelData {
    resort: Resort;
    flightDetails: FlightDetails;
    bookingDetails: BookingDetails;
}

interface Resort {
    id: string;
    name: string;
    regionName: string;
    countryName: string;
    starRating: number;
    overview: string;
    image: Image;
}

interface Image {
    url: string;
    description: string;
}

interface FlightDetails {
    departureAirport: string;
    departureDate: string;
}

interface BookingDetails {
    party: Party;
    lengthOfStay: number;
    price: Price;
}

interface Party {
    adults: number;
    children: number;
    infants: number;
}

interface Price {
    amount: number;
    currency: string;
}