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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part={part1.name} numberExercises={part1.exercises} />
      <Content part={part2.name} numberExercises={part2.exercises} />
      <Content part={part3.name} numberExercises={part3.exercises} />
      <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))