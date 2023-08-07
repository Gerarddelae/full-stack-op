import React, { useState, useEffect } from "react";
import "./index.css";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import personService from "./services/persons";
import { Button } from "./components/Button";
import { Notification } from "./components/Notification";
import { Error } from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const onlyNames = persons.map((persons) => persons.name);
    const position = onlyNames.indexOf(newName);
    const id = position === -1 ? undefined : position;
    const serverID = id === undefined ? -1 : persons[id].id;
    onlyNames.includes(newName)
      ? updateNumber(serverID, newName, newNumber)
      : personService
          .create(newPerson)
          .then((newPerson) => {
            setPersons(persons.concat(newPerson));
            setNewName("");
            setNewNumber("");
          })
          .then(
            setMessage(`Added ${newName}`),
            setTimeout(() => {
              setMessage(null);
            }, 2000)
          ).catch((error) => {setErrorMessage(error.response.data.error);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).catch((error) => {
        setErrorMessage(`${name} was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
      setPersons(persons.filter((person) => person.id !== id));
    } else {
      return;
    }
  };

  const updateNumber = (id, name, number) => {
    const updatedPerson = {
      name: name,
      number: number,
    };
    if (
      window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personService
        .update(id, updatedPerson)
        .then((returned) =>
          setPersons(
            persons.map((person) => (person.id !== id ? person : returned))
          )
        );
    } else {
      return;
    }
  };

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
      <h1>Phonebook App</h1>
      <Notification message={message} />
      <Error message={errorMessage} />
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
        {personsToShow.map((persons) => (
          <p key={persons.id} style={{ margin: 0 }}>
            {persons.name} {persons.number}
            <Button
              id={persons.id}
              name={persons.name}
              deletePerson={deletePerson}
            />{" "}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
