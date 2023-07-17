export const Button = ({id, name, deletePerson}) => {
    const showID = () => {
        deletePerson(id, name)
    }
    return <button onClick={showID}>delete</button>
}