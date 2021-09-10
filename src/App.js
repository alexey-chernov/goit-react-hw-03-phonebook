import React, { Component } from 'react';
import Container from './components/Container';
import ContactForm from './components/FormContacts';
import ContactList from './components/ListContacts';
import Filter from './components/Filter';
import { v4 as uuidv4 } from 'uuid';


class App extends Component {

    state = {
        contacts: [],
        filter: '',
    };

    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsedcontacts = JSON.parse(contacts);
        parsedcontacts && this.setState({ contacts: parsedcontacts });
    }

    componentDidUpdate(prevProps, prevState) {
        const nextContacts = this.state.contacts;
        const prevContacts = prevState.contacts;

        if (nextContacts !== prevContacts) {
            localStorage.setItem('contacts', JSON.stringify(nextContacts));
        }
    }

    addContact = ({ name, number }) => {
        const contact = {
            id: uuidv4(),
            name,
            number,
        };

        const { contacts } = this.state;

        if (
            contacts.find(
                contact => contact.name.toLowerCase() === name.toLowerCase(),
            )
        ) {
            alert(`${name} вже присутній в довіднику контактів.`);
        } else if (contacts.find(contact => contact.number === number)) {
            alert(`${number} вже присутній в довіднику.`);
        } else if (name.trim() === '' || number.trim() === '') {
            alert("Введіть назву контакту і номер телефону!");
        } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(number)) {
            alert('Введіть правильний номер телефону!');
        } else {
            this.setState(({ contacts }) => ({
                contacts: [...contacts, contact],
            }));

        }
    };

    deleteContact = id =>
        this.setState(({ contacts }) => ({
            contacts: contacts.filter(contact => contact.id !== id),
        }));

    changeFilter = event => {
        this.setState({ filter: event.currentTarget.value });
    };

    getVisibleContacts = () => {
        const { contacts, filter } = this.state;
        const normalizedFilter = filter.toLowerCase();

        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter),
        );
    };

    render() {
        const { contacts, filter } = this.state;
        const visibleContacts = this.getVisibleContacts();

        return (
            <Container>
                <h1>Телефонний довідник</h1>
                <ContactForm onSubmit={this.addContact} />
                <h2>Контакти</h2>
                {contacts.length > 1 && (
                    <Filter value={filter} onChange={this.changeFilter} />
                )}
                {contacts.length > 0 ? (
                    <ContactList
                        contacts={visibleContacts}
                        onDelete={this.deleteContact}
                    />
                ) : (
                    <p>Телефонний довідник порожній. Додайте контакт, будь-ласка.</p>
                )}
            </Container>
        );
    }

}

export default App;