import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(questions => setQuestions(questions))
  }, []);

  function handleNewQuestionSubmit(newQuestion){
    setQuestions([...questions, newQuestion])
  }

  function handleDelete(deletedQuestionId){
    fetch(`http://localhost:4000/questions/${deletedQuestionId}`, {
      method: "DELETE"
    })
      .then(() => {
        const updatedQuestions = questions.filter(question => question.id !== deletedQuestionId);
        setQuestions(updatedQuestions);
      })
      .catch(error => console.error("Error deleting question:", error));
  }

  function handleOptionChange(updatedOption){
    const updatedChoices = questions.map(question => {
      if(question.id === updatedOption.id){
        return updatedOption;
      } else {
        return question;
      }
    })
    setQuestions(updatedChoices)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onQuestionFormSubmit={handleNewQuestionSubmit} /> : <QuestionList onOptionChange={handleOptionChange} onDelete={handleDelete} questions={questions} />}
    </main>
  );
}

export default App;
