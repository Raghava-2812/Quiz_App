import React, { useState, useEffect } from "react";
import "./App.css";

const quizData = [
  { question: "What is the capital of India?", options: ["Delhi","Mumbai","Kolkata","Chennai"], answer: "Delhi" },
  { question: "Which language runs in a web browser?", options: ["Java","C","Python","JavaScript"], answer: "JavaScript" },
  { question: "Who developed React.js?", options: ["Google","Facebook","Microsoft","Apple"], answer: "Facebook" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], answer: "Mars" },
  { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
  { question: "Which gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: "Carbon Dioxide" },
  { question: "Who painted Mona Lisa?", options: ["Van Gogh", "Leonardo da Vinci", "Michelangelo", "Picasso"], answer: "Leonardo da Vinci" },
  { question: "What is the speed of light?", options: ["3x10^8 m/s", "3x10^6 m/s", "3x10^5 m/s", "3x10^7 m/s"], answer: "3x10^8 m/s" },
  { question: "What is H2O commonly known as?", options: ["Salt", "Water", "Hydrogen", "Oxygen"], answer: "Water" },
  { question: "Who discovered gravity?", options: ["Newton", "Einstein", "Tesla", "Faraday"], answer: "Newton" }

];

function App() {
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill(""));
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [reviewQ, setReviewQ] = useState(Array(quizData.length).fill(false));

  // Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQ] = option;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => { if (currentQ < quizData.length - 1) setCurrentQ(currentQ + 1); };
  const prevQuestion = () => { if (currentQ > 0) setCurrentQ(currentQ - 1); };

  const toggleReview = () => {
    const newReview = [...reviewQ];
    newReview[currentQ] = !newReview[currentQ];
    setReviewQ(newReview);
  };

  const submitQuiz = () => { setShowResult(true); };

  const score = userAnswers.reduce((acc, ans, idx) => (ans === quizData[idx].answer ? acc + 1 : acc), 0);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2,'0');
    const s = (sec % 60).toString().padStart(2,'0');
    return `${m}:${s}`;
  };

  return (
    <div className="app-container">
      <header className="quiz-header">
        <h1>General Knowledge Quiz</h1>
        {!showResult && <div className="timer">Time Left: {formatTime(timeLeft)}</div>}
      </header>

      {!showResult ? (
        <div className="quiz-main">
          <aside className="side-panel">
            <h3>Question Palette</h3>
            <div className="palette">
              {quizData.map((_, idx) => (
                <div
                  key={idx}
                  className={`palette-item ${currentQ === idx ? "active" : userAnswers[idx] ? "answered" : ""} ${reviewQ[idx] ? "review" : ""}`}
                  onClick={() => setCurrentQ(idx)}
                >
                  {idx + 1}
                </div>
              ))}
            </div>
            <button className="review-btn" onClick={toggleReview}>
              {reviewQ[currentQ] ? "Unmark Review" : "Mark for Review"}
            </button>
          </aside>

          <main className="quiz-container">
            <div className="question-card">
              <h2>Q{currentQ + 1}: {quizData[currentQ].question}</h2>
              <div className="options">
                {quizData[currentQ].options.map((option, idx) => (
                  <button
                    key={idx}
                    className={`option-btn ${userAnswers[currentQ] === option ? "selected" : ""}`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="question-nav">
              <button onClick={prevQuestion} disabled={currentQ === 0}>Previous</button>
              {currentQ === quizData.length - 1 ? (
                <button onClick={submitQuiz} className="submit-btn">Submit</button>
              ) : (
                <button onClick={nextQuestion}>Next</button>
              )}
            </div>
          </main>
        </div>
      ) : (
        <div className="result-container">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {quizData.length}</p>
        </div>
      )}
    </div>
  );
}

export default App;
