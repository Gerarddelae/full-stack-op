import { Part } from "./Part"

export const Content = ({parts}) => {
    const total = (exercises) => {
       return exercises.reduce((a, b) => a + b, 0)
      }

    const exercisesArray = parts.map(part => part.exercises)
    const totalExercises = total(exercisesArray)

    console.log(exercisesArray);
    return (
      <>
        <div>
            {parts.map(part => 
                    <Part key={part.id} name={part.name} numberExercises={part.exercises} />
                    )}
        </div>
        <strong>total of {totalExercises} exercises</strong>
      </>
    )
  }