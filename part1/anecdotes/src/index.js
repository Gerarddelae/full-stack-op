import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({name, handleClick}) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Count = ({votes}) => {
  return (
    <p>has {votes} votes</p>
  )
}

const Title = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const Anecdote = ({anecdotes, selected}) => {

  return (
    <p>{anecdotes[selected]}</p>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(6).fill(0))

  const randomInt = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  const addVote = () =>  {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  let maxVote = points.indexOf(Math.max(...points))

  return (
    <>
      <Title name={"Anecdote of the day"} />
      <div>
        <Anecdote anecdotes={anecdotes} selected={selected} />
      </div>
      <Count votes={points[selected]} />
      <Button name={"vote"} handleClick={addVote} />
      <Button name={"next anecdote"} handleClick={randomInt} />
      <Title name={"Anecdote with most votes"} />
      <div>
        <Anecdote anecdotes={anecdotes} selected={maxVote} />
      </div>
    </>

  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)