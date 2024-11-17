export function formatGuestString(adults: number, children = 0, infants = 0) {
    let result = '';

    if (adults === 1) {
        result += '1 adult';
    } else {
        result += `${adults} adults`;
    }

    if (children > 0) {
        if (children === 1) {
            result += ', 1 child';
        } else {
            result += `, ${children} children`;
        }
    }

    if (infants > 0) {
        if (infants === 1) {
            result += ' & 1 infant';
        } else {
            result += ` & ${infants} infants`;
        }
    }

    return result.trim();
}