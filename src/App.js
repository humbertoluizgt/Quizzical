import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home'
import Quiz from './components/Quiz'

function App() {

  const [dataAPI, setDataAPI] = useState([])

  const [resetGame, setResetGame] = useState(false)  

  useEffect( () => {
    async function fetchData() {
      const response = await fetch('https://opentdb.com/api.php?amount=5');
      const data = await response.json();
      return data;
    }
    fetchData().then(data => setDataAPI(data.results))
  }, [resetGame] ) 

  const [quizStarted, setQuizStarted] = useState(false)

  const startQuiz = () => setQuizStarted(true)

  return (
    <main>
      { quizStarted? 
        <Quiz 
          dataAPI={dataAPI} 
          resetGame={() => setResetGame(prev => !prev)} /> 
        : <Home startQuiz={() => startQuiz()} /> 
      }
    </main>
  );
}

export default App;