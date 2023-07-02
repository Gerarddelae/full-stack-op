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

const StatisticLine = ({name, count}) => {
  return (
    <>
      <td>{name}</td>
      <td>{count}</td>
    </>
  )
}

const Statistics = ({stats}) => {
  const {good, bad, neutral} = stats
  let all = good + bad + neutral
  let average = (good *(1) + bad*(-1))/all
  let positive = (good/all * 100) + " %"
  if (all === 0) {
    return (<p>no feedback given</p>)
  }
  return (
  <>
    <table>
      <tr>
        <StatisticLine name={"good"} count={good} />
      </tr>
      <tr>
        <StatisticLine name={"neutral"} count={neutral}/>
      </tr>
      <tr>
        <StatisticLine name={"bad"} count={bad}/>
      </tr>
      <tr>
        <StatisticLine name={"all"} count={all}/>
      </tr>
      <tr>
        <StatisticLine name={"average"} count={average}/>
      </tr>
      <tr>
        <StatisticLine name={"positive"} count={positive}/>
      </tr>
    </table>
  </>
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

  const stats = {
    good,
    neutral,
    bad
  }

  return (
    <div>
      <Title title={"give feedback"}/>
      <Button name={"good"} handleClick={addGood}/>
      <Button name={"neutral"} handleClick={addNeutral}/>
      <Button name={"bad"} handleClick={addBad}/>
      <Title title={"statistics"}/>
      <Statistics stats={stats}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
