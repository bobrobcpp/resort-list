import { describe, it, expect } from 'vitest';
import { formatGuestString } from './formatGuestString';

describe('formatGuestString', () => {
    it('should format a string for 1 adult', () => {
        expect(formatGuestString(1)).toBe('1 adult');
    });

    it('should format a string for multiple adults', () => {
        expect(formatGuestString(3)).toBe('3 adults');
    });

    it('should format a string for adults and one child', () => {
        expect(formatGuestString(2, 1)).toBe('2 adults, 1 child');
    });

    it('should format a string for adults and multiple children', () => {
        expect(formatGuestString(2, 3)).toBe('2 adults, 3 children');
    });

    it('should format a string for adults, children, and one infant', () => {
        expect(formatGuestString(2, 2, 1)).toBe('2 adults, 2 children & 1 infant');
    });

    it('should format a string for adults, children, and multiple infants', () => {
        expect(formatGuestString(2, 2, 2)).toBe('2 adults, 2 children & 2 infants');
    });

    it('should format a string for 1 adult, 1 child, and 1 infant', () => {
        expect(formatGuestString(1, 1, 1)).toBe('1 adult, 1 child & 1 infant');
    });

    it('should format a string for 1 adult and multiple infants', () => {
        expect(formatGuestString(1, 0, 2)).toBe('1 adult & 2 infants');
    });

    it('should handle no children or infants', () => {
        expect(formatGuestString(4, 0, 0)).toBe('4 adults');
    });

    it('should handle only infants with no adults or children (edge case)', () => {
        expect(formatGuestString(0, 0, 1)).toBe('0 adults & 1 infant');
    });
});
