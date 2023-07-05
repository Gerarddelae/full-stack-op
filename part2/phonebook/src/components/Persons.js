export const Persons = ({persons, filter}) => {
    const personsToShow = filter === '' ? persons : 
    persons
      .filter(person => 
        person.name
          .toLocaleLowerCase()
          .startsWith(filter
            .toLocaleLowerCase()))
    return (
        <div>
        {personsToShow.map(persons => 
          <p style={{margin: 0}}>{persons.name} {persons.number} </p> 
          )}
      </div>
    )
}