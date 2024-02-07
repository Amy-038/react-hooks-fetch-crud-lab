import React from "react";

function QuestionItem({ question, onDelete, onOptionChange }) {
  const { id, prompt, answers = [], correctIndex } = question;

  function handleDeleteClick(){
    onDelete(id);
  }

  function handleChange(event){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: event.target.value
      })
    })
      .then(response => response.json())
      .then(updatedChoice => onOptionChange(updatedChoice))
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
