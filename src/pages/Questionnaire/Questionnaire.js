import React, { useState } from "react";
import QuestionnaireForm from "../../components/QuestionnaireForm/QuestionnaireForm";
import QuestionnaireResults from "../../components/QuestionnaireResults/QuestionnaireResults";
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
      {submitted && <QuestionnaireResults answerBooks={answerBooks} />}
    </div>
  );
}
export default Questionnaire;
