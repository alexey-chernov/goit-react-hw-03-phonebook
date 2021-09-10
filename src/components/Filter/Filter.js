import PropTypes from 'prop-types';

import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => {
    return (
        <label className={styles.Label}>
            Пошук контакту за іменем
            <input
                type="text"
                name="filter"
                className={styles.Input}
                value={value}
                onChange={onChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Ім'я може складатись лише із букв, апострофа, тире та пробілів. Наприклад Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan і т.д."
                required
            />
        </label>
    );
};

Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default Filter;
