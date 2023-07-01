import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({title}) => {
  return <h2>{title}</h2>
}

const Button = ({name, handleClick}) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Count = ({name, count}) => {
  return (
    <p>{name} {count}</p>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }
  
  const addNeutral = () => {
    setNeutral(neutral + 1)
  }
  
  const addBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Title title={"give feedback"}/>
      <Button name={"good"} handleClick={addGood}/>
      <Button name={"neutral"} handleClick={addNeutral}/>
      <Button name={"bad"} handleClick={addBad}/>
      <Title title={"statistics"}/>
      <Count name={"good"} count={good}/>
      <Count name={"neutral"} count={neutral}/>
      <Count name={"bad"} count={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
