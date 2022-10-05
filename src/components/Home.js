import React from "react";
import './Home.css'

function Home(props) {
  return (
    <section className="home--section">      
      <h1 className="home--title">Quizzical</h1>
      <h4 className="home--description">Test your knowledgment with this Quizz App</h4>
      <button 
        className="home--button"
        onClick={props.startQuiz}
      >
          Start Quiz
      </button>
    </section>
  )
}

export default Home