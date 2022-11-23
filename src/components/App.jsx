import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Phonebook } from './phonebook/phonebook';
import { PhonebookFilter } from './phonebook/phonebookFilter';
import { PhonebookList } from './phonebook/phonebookList';
import './phonebook/phonebook-style.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('phonebook')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    if (dublicateFinder(data)) {
      return alert(`${data.name} уже существует в списке контактов`);
    }
    const newContact = {
      id: nanoid(5),
      ...data,
    };
    setContacts([...contacts, newContact]);
  };

  const removeContact = id => {
    setContacts(contacts.filter(item => item.id !== id));
  };

  const dublicateFinder = ({ name }) => {
    const result = contacts.find(item => item.name === name);
    return result;
  };

  const handlefilter = evt => {
    const { value } = evt.currentTarget;
    setFilter(value);
  };

  const filteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const filterContact = contacts.filter(({ name }) => {
      const result = name.toLowerCase().includes(filter.toLowerCase());
      return result;
    });
    return filterContact;
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Phonebook AddContact={addContact} />
      {contacts.length !== 0 && (
        <>
          <h2>Contacts :</h2>
          <PhonebookFilter onFilter={handlefilter} value={filter} />
          <PhonebookList
            list={filteredContacts()}
            onContactRemover={removeContact}
          />
        </>
      )}
    </>
  );
};
