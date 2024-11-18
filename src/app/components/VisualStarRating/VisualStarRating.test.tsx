import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VisualStarRating } from './VisualStarRating'; // Update the path as necessary

describe('VisualStarRating', () => {
    it('renders the correct number of stars based on the rating', () => {
        render(<VisualStarRating rating={5} />);
        const stars = screen.getAllByRole('img', { name: 'star' });
        expect(stars.length).toBe(5);
    });

    it('renders no stars when rating is 0', () => {
        render(<VisualStarRating rating={0} />);
        const stars = screen.queryAllByRole('img', { name: 'star' });
        expect(stars.length).toBe(0);
    });

    it('renders the correct number of stars for a rating of 1', () => {
        render(<VisualStarRating rating={1} />);
        const stars = screen.getAllByRole('img', { name: 'star' });
        expect(stars.length).toBe(1);
    });
});
