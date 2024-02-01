import "./QuestionnaireResults.scss";

import React from "react";
import { Link } from "react-router-dom";

function QuestionnaireResults({ answerBooks }) {
  return (
    <div className="results">
      {answerBooks.map((book) => (
        <Link
          to={`/book/${book.id}`}
          key={book.id}
          className="results__container"
        >
          <img src={book.image} className="results__image" />
          <div>
            <p className="results__text results__title">Title: {book.title}</p>
            <p className="results__text results__author">Author: {book.name}</p>
            <p className="results__text results__pages">
              No. of Pages: {book.pages}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default QuestionnaireResults;
