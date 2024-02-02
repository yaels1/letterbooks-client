import "./Questionnaire.scss";

import React, { useState } from "react";
import QuestionnaireForm from "../../components/QuestionnaireForm/QuestionnaireForm";

import { Link } from "react-router-dom";

function Questionnaire({}) {
  const [submitted, setSubmitted] = useState(false);
  const [answerBooks, setAnswerBooks] = useState([]);

  return (
    <div className="submitted">
      {!submitted && (
        <QuestionnaireForm
          setSubmitted={setSubmitted}
          setAnswerBooks={setAnswerBooks}
        />
      )}
      {submitted && (
        <Link to="/list/recommendations" className="submitted__link">
          <p className="submitted__link-text">
            Click here to get your recommendations!
          </p>
        </Link>
      )}
    </div>
  );
}
export default Questionnaire;
