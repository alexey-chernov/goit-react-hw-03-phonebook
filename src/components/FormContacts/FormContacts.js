import { Component } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import styles from './FormContacts.module.css';

class FormContacts extends Component {
    state = {
        name: '',
        number: '',
    };

    handleChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state);

        this.resetForm();
    };

    resetForm = () => this.setState({ name: '', number: '' });

    render() {
        const { name, number } = this.state;
        return (
            <form className={styles.Form} onSubmit={this.handleSubmit}>
                <label className={styles.Label}>
                    Ім'я
                    <InputMask
                        className={styles.Input}
                        type="text"
                        name="name"
                        //pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ]) ? [a-zA-Zа-яА-Я]*)*$"
                        maxLength='20'
                        placeholder="Sylvester Stalone"
                        title="Ім'я може складатись лише із букв, апострофа, тире та пробілів. Наприклад Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan і т.д."
                        required
                        value={name}
                        onChange={this.handleChange}
                    />
                </label>
                <label className={styles.Label}>
                    Номер
                    <InputMask
                        className={styles.Input}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Номер телефону може складатись з цифр і може скаладтись з пробілів, тире, круглих дужок і може починатись з +"
                        required
                        onChange={this.handleChange}
                        value={number}
                        placeholder="+38 (099) 999-99-99"
                        mask="+38 (099) 999-99-99"
                    />
                </label>
                <button className={styles.Button} type="submit">
                    Додати контакт
                </button>
            </form>
        );
    }
}

FormContacts.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default FormContacts;
