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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const parts = course.parts
  console.log(parts);

  return (
    <div>
      <Header course={course.name} />
      <Content part={parts[0].name} numberExercises={parts[0].exercises} />
      <Content part={parts[1].name} numberExercises={parts[1].exercises} />
      <Content part={parts[2].name} numberExercises={parts[2].exercises} />
      <Total exercises={parts.map(part => part.exercises)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))