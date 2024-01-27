import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const Questionnaire = () => {
  const navigate = useNavigate();

  const [answer, setAnswer] = useState({
    question1: null,
    question2: null,
    question3: null,
  });
  const [listAllBooks, setListAllBooks] = useState([]);
  const [menuTheme, setMenuTheme] = useState([]);
  const [length, setLength] = useState([]);

  const handleAnswer = (event) => {
    const { name, value } = event.target;

    setAnswer({ ...answer, [name]: value });
  };

  const fetchThemes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/letterbooks/book`);
      setListAllBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  //   filter through questions
  useEffect(() => {
    console.log(answer.question1);
    console.log(answer.question2);
    const filteredBooks = listAllBooks.filter((book) => {
      if (answer.question1 == "fiction" && book.fiction) {
        return book;
      } else if (answer.question1 == "non-fiction" && !book.fiction) {
        return book;
      }
    });
    const themes = new Array(
      ...new Set(filteredBooks.map((book) => book.themes).flat())
    );

    setMenuTheme(themes);
  }, [answer.question1]);

  useEffect(() => {
    console.log(answer.question3);
  }, [answer.question3]);

  const isFormValid = () => {
    if (!answer.question1 || !answer.question2) {
      console.log("Please Answer the first 2 questions");
      return false;
    } else {
      return true;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (isFormValid()) {
      try {
        const response = await axios.post(
          `${apiUrl}/letterbooks/questionnaire`
        );
        navigate("/list/recommendations");
        setAnswer(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("pls answer all necessary questions");
    }
  };

  return (
    <main>
      <h1>wow what a crazy questionnaire</h1>
      <p>wow what a good mini explanation</p>
      <p>pick fiction or non fiction, then choose theme, length is optional</p>

      <form className="form" onSubmit={submitHandler}>
        <div className="form__container">
          <p>question 1</p>

          <label htmlFor="question" className="form__question">
            fiction
            <input
              type="radio"
              name="question1"
              value="fiction"
              className="form__question-input"
              onChange={handleAnswer}
            />
          </label>
          <label htmlFor="question" className="form__question">
            non-fiction
            <input
              type="radio"
              name="question1"
              value="non-fiction"
              className="form__question-input"
              onChange={handleAnswer}
            />
          </label>
        </div>

        <div className="form__container">
          <p>question 2</p>
          <label htmlFor="question" className="form__question">
            {" "}
            Please select{" "}
          </label>
          <select
            name="question2"
            className="form__question-theme"
            onChange={handleAnswer}
          >
            {menuTheme?.length > 0 &&
              menuTheme.map((themeName) => {
                return (
                  <option key={themeName} value={themeName}>
                    {themeName}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form__container">
          <p>question 3</p>
          <label htmlFor="question" className="form__question">
            small - less than 500 pages
            <input
              type="radio"
              name="question3"
              value="small"
              className="form__question-input"
              onChange={handleAnswer}
            />
          </label>
          <label htmlFor="question" className="form__question">
            medium - between 500 and 800 pages
            <input
              type="radio"
              name="question3"
              value="medium"
              className="form__question-input"
              onChange={handleAnswer}
            />
          </label>
          <label htmlFor="question" className="form__question">
            large - more than 800 pages
            <input
              type="radio"
              name="question3"
              value="large"
              className="form__question-input"
              onChange={handleAnswer}
            />
          </label>
        </div>

        <div className="form__button">
          <Link to="/" className="form__button-cancel">
            <p>Cancel</p>
          </Link>
          {/* <Link to="/list/recommendations" className="form__button-submit"> */}
          <button className="form__button-submit">GET RECOMMENDATION!</button>
          {/* </Link> */}
        </div>
      </form>
    </main>
  );
};
export default Questionnaire;
