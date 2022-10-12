import { useState, useEffect }  from "react";
import { nanoid } from 'nanoid';
import { Phonebook } from "./phonebook/phonebook";
import {PhonebookFilter} from './phonebook/phonebookFilter';
import {PhonebookList} from './phonebook/phonebookList';
import './phonebook/phonebook-style.css';


const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('phone-list')) ?? [])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    localStorage.setItem('phone-list', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = ({ name }) => {
    const result = contacts.find(item => item.name === name);
    return result;
  };

  const addContacts = data => {
    if (isDublicate(data)) {
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

  const filterChange = evt => {
    const { value } = evt.currentTarget;
    setFilter(value);
  };

  const getFilter = () => {
    if (!filter) {
      return contacts;
    }
    const normalisedFilter = filter.toLowerCase();
    const filterContact = contacts.filter(({ name }) => {
      const normalisedName = name.toLowerCase();
      const result = normalisedName.includes(normalisedFilter);
      return result;
    });
    return filterContact;
  };
  
    return (
      <>
      <h1>Phonebook</h1>
        <Phonebook
          onAddContacs={addContacts}
        />
        {contacts.length !== 0 && (
          <>
            <h2>Contacts :</h2>
            <PhonebookFilter
              onChange={filterChange}
              value={filter}
            />
            <PhonebookList
              items={getFilter()}
              onRemove={removeContact}
            />
          </>
        )}
      </>
    );
  }

export {App}