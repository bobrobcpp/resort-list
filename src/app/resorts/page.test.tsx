import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Resorts from './page'
import { sortedListings } from '../utils/sortedListings'

// Mock CSS module
vi.mock('./page.module.css', () => ({
    default: {
        page: 'page',
        contentContainer: 'contentContainer',
        sortBar: 'sortBar'
    }
}))

// Mock the child components
vi.mock('@/components/SortBar/SortBar', () => ({
    default: () => <div data-testid="mock-sort-bar">Sort Bar</div>
}))

vi.mock('@/components/ResortList/ResortList', () => ({
    ResortList: () => <div data-testid="mock-resort-list">Resort List</div>
}))

// Mock the sortedListings utility
vi.mock('@/utils/sortedListings', () => ({
    sortedListings: vi.fn((data) => data)
}))

const mockData = [
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
            departureAirport: 'EMA',
            departureDate: '2024-12-01',
        },
        bookingDetails: {
            party: { adults: 2, children: 0, infants: 0 },
            lengthOfStay: 5,
            price: { amount: 200, currency: 'GBP' },
        },
    },
];

describe('Resorts Component', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn())
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should show loading state initially', () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            new Promise(resolve => setTimeout(resolve, 100))
        ))

        render(<Resorts />)
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('should render data successfully after fetch', async () => {
        vi.stubGlobal('fetch', vi.fn().mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        ))

        render(<Resorts />)

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
        })

        expect(screen.getByTestId('mock-sort-bar')).toBeInTheDocument()
        expect(screen.getByTestId('mock-resort-list')).toBeInTheDocument()
    })

    it('should handle fetch error', async () => {
        const errorMessage = 'HTTP error 404'
        vi.stubGlobal('fetch', vi.fn().mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                status: 404
            })
        ))

        render(<Resorts />)

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument()
        })
    })

    it('should handle network error', async () => {
        vi.stubGlobal('fetch', vi.fn().mockImplementationOnce(() =>
            Promise.reject(new TypeError('NetworkError'))
        ))

        render(<Resorts />)

        await waitFor(() => {
            expect(screen.getByText('TypeError')).toBeInTheDocument()
        })
    })

    it('should update sort method when data changes', async () => {
        vi.stubGlobal('fetch', vi.fn().mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        ))

        render(<Resorts />)

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
        })

        // Verify that sortedListings was called with the correct parameters
        expect(sortedListings).toHaveBeenCalledWith(mockData, 'price')
    })
})
