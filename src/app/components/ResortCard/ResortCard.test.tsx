import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { ResortCard } from './ResortCard'

const resortDetails = {
    "resort": {
        "id": "111",
        "name": "Iberostar Grand Salome",
        "regionName": "Costa Adeje",
        "countryName": "Tenerife",
        "starRating": 5,
        "overview": "The Iberostar Grand Salomehas an exceptional location in the south of Tenrife, overlooking the Atlantic Ocean. It is situated between the Golf del Sur and the Amarillo Golf Courses, and is an ideal hotel for families couples and groups who are looking for a holiday full of sport, sun and sea.",
        "image": {
            "url": "https://static.onthebeach.co.uk/fe-code-test/hotel-image-1.jpg",
            "description": "A tranquil resort swimming pool with clear blue water, surrounded by two-story villas with terracotta roofs under a bright blue sky."
        }
    },
    "flightDetails": {
        "departureAirport": "East Midlands",
        "departureDate": "2030-07-03T00:00:00.000Z"
    },
    "bookingDetails": {
        "party": { "adults": 2, "children": 2, "infants": 1 },
        "lengthOfStay": 7,
        "price": {
            "amount": 1136.5,
            "currency": "GBP"
        }
    }
}
describe('ResortCard', () => {
    vi.mock('next/navigation', () => ({ useRouter: vi.fn() }))
    it('renders the resort card key information', () => {
        render(<ResortCard key={1}{...resortDetails} />)
        expect(screen.getByText('Iberostar Grand Salome')).toBeInTheDocument()
        expect(screen.getByText('Costa Adeje, Tenerife')).toBeInTheDocument()
        expect(screen.getByText('departs from East Midlands')).toBeInTheDocument()
        expect(screen.getByText('2 adults, 2 children & 1 infant')).toBeInTheDocument()
        expect(screen.getByText('3rd July 2030 for 7 days')).toBeInTheDocument()
        expect(screen.getByText('Read more about this hotel')).toBeInTheDocument()
        expect(screen.getByText('Book now')).toBeInTheDocument()
        expect(screen.getByText('£1136.5')).toBeInTheDocument()
        const images = screen.getAllByRole('img')
        expect(images).toHaveLength(6)
        const allStars = images.filter(img => img.getAttribute('aria-label') === 'star')
        expect(allStars).toHaveLength(5)
        const buttons = screen.getAllByRole('button')
        expect(buttons).toHaveLength(2)
        const region = screen.getByRole('region', { hidden: true })
        expect(region).toHaveAttribute('aria-hidden', 'true')
    })
    it('renders the overview text after the read more button clicked', async () => {
        render(<ResortCard key={1}{...resortDetails} />)
        await userEvent.click(screen.getByText('Read more about this hotel'))
        const region = screen.getByRole('region')
        expect(region).toHaveAttribute('aria-hidden', 'false')
        expect(screen.getByText('Overview')).toBeInTheDocument()
        expect(screen.getByText(/The Iberostar Grand Salomehas an exceptional location/)).toBeInTheDocument()
    })
})
