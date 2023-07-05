import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    const onlyNames = persons.map(persons => persons.name)
    onlyNames.includes(newName)? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(persons => 
          <p style={{margin: 0}}>{persons.name} </p> 
          )}
      </div>
    </div>
  )
}

export default App
