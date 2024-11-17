import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DynamicIcon } from './DynamicIcon'

describe('DynamicIcon', () => {
    it('renders the alphabetic icon', () => {
        render(<DynamicIcon icon='ArrowDownAZ' />)
        expect(screen.getByRole('img')).toHaveAttribute('class', expect.stringContaining('lucide-arrow-down-az'))
    })
    it('renders the pound icon', () => {
        render(<DynamicIcon icon='PoundSterling' />)
        expect(screen.getByRole('img')).toHaveAttribute('class', expect.stringContaining('lucide-pound-sterling'))
    })
    it('renders the star icon', () => {
        render(<DynamicIcon icon='Star' />)
        expect(screen.getByRole('img')).toHaveAttribute('class', expect.stringContaining('lucide-star'))
    })
    it('renders no icon', () => {
        render(<DynamicIcon icon='UnknownIcon' />)
        expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
})
