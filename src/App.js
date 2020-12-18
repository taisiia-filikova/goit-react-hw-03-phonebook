import { Component } from 'react';

import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import ContactFilter from './components/ContactFilter/ContactFilter';

import shortid from 'shortid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      toast(`${number} is already in contacts.`);
    } else if (name.trim() === '' || number.trim() === '') {
      toast.info('Enter the name and phone number!');
    } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(number)) {
      toast.error('Enter the correct phone number!');
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts].sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        }),
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

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

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
        <ToastContainer autoClose={3700} />
      </Container>
    );
  }
}

export default App;
