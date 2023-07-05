import React, { useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const onlyNames = persons.map(persons => persons.name)
    onlyNames.includes(newName)? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const onlyNames = persons.map(persons => persons.name)
  const personsToShow = filter === '' ? persons : 
  persons
    .filter(person => 
      person.name
        .toLocaleLowerCase()
        .startsWith(filter
          .toLocaleLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons 
      persons={persons} 
      filter={filter} 
      />
    </div>
  )
}

export default App
