import React from "react";
import { nanoid } from 'nanoid'
import './QuestionCard.css'
import he from 'he'

function QuestionCard(props) {

  function showAnswers(answer, question) {
    if ( props.displayAnswers ) {
      if ( answer.answer === question.correctAnswer ) {
        return "question-card--answer correct"
      } else if ( answer.selected ) {
        return "question-card--answer incorrect"
      } else {
        return "question-card--answer faded"
      }
    } else {
      return answer.selected? "question-card--answer selected" : "question-card--answer"
    }
  } 

  return props.questionnaire.map( question => {
    return (
      <React.Fragment key={nanoid()}>
        <article className="question-card--box">
          <h1 className="question-card--question">{he.decode(question.question)}</h1> 
          <div className="question-card--answers-container">
            {
              question.allAnswers.map(answer =>                   
                <React.Fragment key={nanoid()}>
                  <button
                    className = {showAnswers(answer, question)}
                    //className = {answer.selected? "question-card--answer selected" : "question-card--answer"}
                    onClick = {() => props.selectAnswer(question.key, answer.key)}
                  >
                      {he.decode(answer.answer)}
                  </button>
                </React.Fragment>)
            }
          </div> 
          <hr className="question-card--hr" />        
        </article> 
      </React.Fragment>
    )       
  })
} 

export default QuestionCard