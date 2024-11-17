import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './page'
import { ResortListingsContext } from '../context/resortsContext'
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
        id: 1,
        name: "Hotel A",
        price: 100,
        stars: 4,
        location: "Location A"
    },
    {
        id: 2,
        name: "Hotel B",
        price: 200,
        stars: 5,
        location: "Location B"
    }
]

// Create a wrapper component that provides the context
const renderWithContext = (component: React.ReactNode) => {
    return render(
        <ResortListingsContext.Provider
            value={{
                sortedListings: mockData,
                callback: vi.fn()
            }}
        >
            {component}
        </ResortListingsContext.Provider>
    )
}

describe('Home Component', () => {
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

        render(<Home />)
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('should render data successfully after fetch', async () => {
        vi.stubGlobal('fetch', vi.fn().mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        ))

        render(<Home />)

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

        render(<Home />)

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument()
        })
    })

    it('should handle network error', async () => {
        vi.stubGlobal('fetch', vi.fn().mockImplementationOnce(() =>
            Promise.reject(new TypeError('NetworkError'))
        ))

        render(<Home />)

        await waitFor(() => {
            expect(screen.getByText('TypeError')).toBeInTheDocument()
        })
    })

    it('should update sort method when data changes', async () => {
        const mockSortedListings = vi.fn()
        vi.stubGlobal('fetch', vi.fn().mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        ))

        const { rerender } = render(<Home />)

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
        })

        // Verify that sortedListings was called with the correct parameters
        expect(sortedListings).toHaveBeenCalledWith(mockData, 'price')
    })
})

// Add type for the mock to avoid TypeScript errors
declare global {
    interface Window {
        fetch: any
    }
}