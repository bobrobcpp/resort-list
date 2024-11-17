import { useContext } from 'react';
import { DynamicIcon } from '@/components/DynamicIcon/DynamicIcon';
import { ResortListingsContext } from '@/context/resortsContext';
import styles from './SortBar.module.css';

const SortBar = () => {
    const context = useContext(ResortListingsContext);

    const sortOptions = [
        { id: 'name', label: 'Sort alphabetically', icon: 'ArrowDownAZ' },
        { id: 'price', label: 'Sort by price', icon: 'PoundSterling' },
        { id: 'rating', label: 'Sort by star rating', icon: 'Star' },
    ];

    const handleSort = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                        <DynamicIcon icon={option.icon} />
                    </label>
                </div>
            ))}
        </fieldset>
    );
}

export default SortBar;