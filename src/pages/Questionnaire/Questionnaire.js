import React, { useState } from "react";
import QuestionnaireForm from "../../components/QuestionnaireForm/QuestionnaireForm";
import ListRecommendation from "../../components/ListRecommendation/ListRecommendation";

function Questionnaire({}) {
  const [submitted, setSubmitted] = useState(false);
  const [answerBooks, setAnswerBooks] = useState([]);

  return (
    <div>
      {!submitted && (
        <QuestionnaireForm
          setSubmitted={setSubmitted}
          setAnswerBooks={setAnswerBooks}
        />
      )}
      {submitted && <ListRecommendation />}
    </div>
  );
}
export default Questionnaire;
