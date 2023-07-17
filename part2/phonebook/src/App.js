import React, { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import personService from './services/persons'
import { Button } from "./components/Button";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons)
    })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const onlyNames = persons.map((persons) => persons.name);
    onlyNames.includes(newName)
      ? alert(`${newName} is already added to phonebook`)
      : personService.create(newPerson).then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
        personService.remove(id)
        setPersons(persons.filter(person => person.id !== id))
    } else {
        return
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const onlyNames = persons.map((persons) => persons.name);
  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLocaleLowerCase().startsWith(filter.toLocaleLowerCase())
        );
  return (
    <div>
      <h2>Phonebook App</h2>
      <Filter handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h3>Numbers</h3>
      <div>
        {personsToShow.map(persons => 
          <p key={persons.id} style={{margin: 0}}>{persons.name} {persons.number} 
           <Button 
           id={persons.id}
           name={persons.name}
           deletePerson={deletePerson} 
           /> </p> 
          )}
      </div>
    </div>
  );
};

export default App;
