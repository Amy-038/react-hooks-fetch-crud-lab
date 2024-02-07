import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDelete, onOptionChange }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => {
          return <QuestionItem onOptionChange={onOptionChange} onDelete={onDelete} key={question.id} question={question} />
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
