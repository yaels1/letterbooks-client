import "./Questionnaire.scss";

import React, { useState } from "react";
import QuestionnaireForm from "../../components/QuestionnaireForm/QuestionnaireForm";

import { NavLink } from "react-router-dom";

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
        <NavLink to="/list/recommendations" className="submitted__link">
          <p className="submitted__link-text">
            Click here to get your recommendations!
          </p>
        </NavLink>
      )}
    </div>
  );
}
export default Questionnaire;
