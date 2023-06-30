import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <p>{props.part} {props.numberExercises} </p>
  )
}

const Total = ({exercises}) => {
  return (
    <p>Number of exercises {exercises.reduce((a, b) => a + b, 0)}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={part1} numberExercises={exercises1} />
      <Content part={part2} numberExercises={exercises2} />
      <Content part={part3} numberExercises={exercises3} />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))