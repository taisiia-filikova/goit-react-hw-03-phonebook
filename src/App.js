import { Component } from 'react';

import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import ContactFilter from './components/ContactFilter/ContactFilter';

import shortid from 'shortid';

class App extends Component {
  state = {
    contacts: [
      { id: shortid.generate(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: shortid.generate(), name: 'Hermione Kline', number: '443-89-12' },
      { id: shortid.generate(), name: 'Eden Clements', number: '645-17-79' },
      { id: shortid.generate(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  generateContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const { contacts } = this.state;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts.`);
    } else if (name === '' || number === '') {
      alert('Enter the name and phone number!');
    } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(number)) {
      alert('Enter the correct phone number!');
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  removeContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  makeVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.makeVisibleContacts();
    return (
      <Container>
        <h1>My phonebook</h1>
        <ContactForm onSubmit={this.generateContact} />
        <h2>Contacts:</h2>
        {contacts.length > 1 && (
          <ContactFilter value={filter} onChange={this.changeFilter} />
        )}
        {contacts.length > 0 ? (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.removeContact}
          />
        ) : (
          <p>There's nothing in your phonebook. Please add contact.</p>
        )}
      </Container>
    );
  }
}

export default App;
