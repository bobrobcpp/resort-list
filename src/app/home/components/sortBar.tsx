import { useContext } from 'react';
import { ResortListingsContext } from '../../context';
import styles from './SortBar.module.css';

const SortBar = () => {
    const context = useContext(ResortListingsContext);

    const sortOptions = [
        { id: 'name', label: 'Sort alphabetically' },
        { id: 'price', label: 'Sort by price' },
        { id: 'rating', label: 'Sort by star rating' },
    ];

    const handleSort = (event: any) => {
        context.callback(event.target.value);
    };

    return (
        <fieldset className={styles.radioGroup}>
            {sortOptions.map((option) => (
                <div key={option.id} className={styles.radioWrapper}>
                    <input
                        type="radio"
                        id={option.id}
                        name="sort"
                        value={option.id}
                        defaultChecked={option.id === 'price'}
                        onChange={handleSort}
                        className={styles.radioInput}
                    />
                    <label htmlFor={option.id} className={styles.radioLabel}>
                        {option.label}
                    </label>
                </div>
            ))}
        </fieldset>
    );
}

export default SortBar;