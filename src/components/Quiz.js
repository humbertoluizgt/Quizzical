import React, { useEffect, useState } from "react";
import './Quiz.css'
import { nanoid } from 'nanoid'
import QuestionCard from "./QuestionCard";

function Quiz(props) { 

  const [questionnaire, setQuestionnaire] = useState([])

  const [displayAnswers, setDisplayAnswers] = useState(false)

  const [score, setScore] = useState(0)

  function selectAnswer(questionKey, answerKey) {
    if (!displayAnswers) {
      setQuestionnaire(prevState => {      
        const newState = [...prevState]
        for (let i = 0; i < newState.length; i++) {        
          if (newState[i].key === questionKey) {          
            for (let j = 0; j < newState[i].allAnswers.length; j++) {            
              if (newState[i].allAnswers[j].key === answerKey) {              
                newState[i].allAnswers[j].selected = true
              } else {
                newState[i].allAnswers[j].selected = false
              }
            }
          }    
        }
        return newState
      })
    }
  }    

  function handleCheck() {
    const answersSelected =  questionnaire.map( question => 
                                question.allAnswers.map( answer => answer.selected )
                                  .filter( isThereTrue => isThereTrue )
                                  .reduce( total => total + 1, 0 )
                            ).reduce( (total, num) => total + num, 0 )

    if (answersSelected < 5) {
      alert("Answer all questions first")
    } else {
      setDisplayAnswers(true)
      setScore( () => {
        return  questionnaire.map( question => 
                  question.allAnswers.filter( answer => 
                  answer.selected && answer.answer === question.correctAnswer )
                  .reduce( total => total + 1 , 0 )
                ).reduce( (total, num) => total + num , 0 )
      }) 
    }       
  }

  useEffect( () => {
    setScore(0)
    setDisplayAnswers(false)
    setQuestionnaire( () => {  
      return props.dataAPI.map( question => {
        //array cointaining all answers, the right one inclusive
        const answers = []
  
        question.incorrect_answers.forEach(incorrect => 
          answers.push({answer: incorrect, selected: false, key: nanoid()}))
  
        answers.push({answer: question.correct_answer, selected: false, key: nanoid()})
    
        //mix array of answers randomly to avoid the correct answer to be in the end every time
        const mixedAnswers = answers
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    
        //return a tidy array of questions with answers
        return ({
          key: nanoid(),
          question: question.question,
          correctAnswer: question.correct_answer,
          allAnswers: [...mixedAnswers]
        })
      })})
  }, [props.dataAPI] )

  return (
    <section className="quiz--section">     
      <QuestionCard 
        questionnaire = {questionnaire}        
        selectAnswer = {selectAnswer}
        displayAnswers = {displayAnswers}
      />
      { !displayAnswers?
        (
          <button 
            className="quiz--check"
            onClick={handleCheck}>
              Check Answers
          </button>
        )
        :
        ( 
          <div className="quiz--play-again-container">
            <h1 className="quiz--score-line">You scored {score}/5 correct answers</h1>
            <button 
              className="quiz--play-again"
              onClick={props.resetGame}>
                Play again
            </button>
          </div> 
        )
      }
    </section>    
  )
}

export default Quiz