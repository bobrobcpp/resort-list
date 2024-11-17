export const VisualStarRating = ({ rating }: { rating: number }) => {
    return (
        <div>
            {[...Array(rating)].map((_, index) => (
                <span key={index} role="img" aria-label="star">⭐</span>
            ))}
        </div>
    );
}