import PropTypes from 'prop-types';

import styles from './ListContacts.module.css';

const ListContactsItem = ({ id, name, number, onDelete }) => {
    return (
        <li className={styles.Item}>
            <p className={styles.Text}>
                {name}: <span className={styles.Span}>{number}</span>
            </p>
            <button
                className={styles.Button}
                type="button"
                onClick={() => onDelete(id)}
                title="Видалити"
            >
                Видалити
            </button>
        </li>
    );
};

const ListContacts = ({ contacts, onDelete }) => {
    if (contacts.length === 0) return null;
    return (
        <ul className={styles.List}>
            {contacts.map(contact => (
                <ListContactsItem
                    {...contact}
                    onDelete={onDelete}
                    key={contact.id}
                />
            ))}
        </ul>
    );
};

ListContacts.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }),
    ),
    onDelete: PropTypes.func.isRequired,
};

export default ListContacts;
