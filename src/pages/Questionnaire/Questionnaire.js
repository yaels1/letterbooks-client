import "./Questionnaire.scss";

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
  const [bookLength, setBookLength] = useState([]);

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

  //   filter through questions for themes
  useEffect(() => {
    // console.log(answer.question1);
    // console.log(answer.question2);
    const filteredBooksTheme = listAllBooks.filter((book) => {
      if (answer.question1 == "fiction" && book.fiction) {
        return book;
      } else if (answer.question1 == "non-fiction" && !book.fiction) {
        return book;
      }
    });
    const themes = new Array(
      ...new Set(filteredBooksTheme.map((book) => book.themes).flat())
    );
    // console.log(themes);

    setMenuTheme(themes);
  }, [answer.question1]);

  // filter through questions for pages
  useEffect(() => {
    // console.log(answer.question3);

    const filteredBooksLength = listAllBooks.filter((book) => {
      const isUnder500 =
        answer.question1 && answer.question2 && book.pages.data < 500;
      const isBetween500And800 = book.pages.data > 500 && book.pages.data < 800;
      const isAbove800 =
        answer.question1 && answer.question2 && book.pages.data > 800;

      const isFilterValid = () => {
        if (isUnder500 || isBetween500And800 || isAbove800) {
          return true;
        }
      };

      if (isUnder500) {
        return "small";
      }
      if (isBetween500And800) {
        return "medium";
      }
      if (isAbove800) {
        return "large";
      }

      return false;
      isFilterValid();
    });

    const uniqueBookLengths = [
      ...new Set(filteredBooksLength.map((book) => book.pages.data).flat()),
    ];
    // console.log(uniqueBookLengths);

    setBookLength(uniqueBookLengths);

    console.log(filteredBooksLength);
  }, [answer.question1, answer.question2, answer.question3, listAllBooks]);

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
      <div className="intro">
        <h1>wow what a crazy questionnaire</h1>
        <p>wow what a good mini explanation</p>
        <p>
          pick fiction or non fiction, then choose theme, length is optional
        </p>
      </div>

      <form className="form" onSubmit={submitHandler}>
        {/* question 1 */}
        <div className="form__container">
          <p className="form__question">question 1</p>

          <label htmlFor="question" className="form__question-label">
            fiction
            <input
              type="radio"
              name="question1"
              value="fiction"
              className="form__question-input"
              onChange={handleAnswer}
            />
          </label>
          <label htmlFor="question" className="form__question-label">
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

        {/* question 2 */}
        <div className="form__container">
          <p className="form__question">question 2</p>
          <label htmlFor="question" className="form__question-label">
            {" "}
            Please select{" "}
          </label>
          <select
            name="question2"
            className="form__question-theme"
            onChange={handleAnswer}
          >
            <option>select theme</option>
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

        {/* question 3 */}
        <div className="form__container">
          <p className="form__question">question 3</p>
          <label htmlFor="question" className="form__question-label">
            {" "}
            Please select{" "}
          </label>

          <select
            name="question3"
            className="form__question-length"
            onChange={handleAnswer}
          >
            <option value="0">select length</option>
            {/* if isUnder500 */}
            <option value="1">small</option>
            {/* if isBetween500And800 */}
            <option value="2">medium</option>
            {/* if isAbove800 */}
            <option value="3">large</option>
          </select>
        </div>

        <div className="form__container form__button">
          {/* <Link to="/list/recommendations" className="form__button-submit"> */}
          <button className="form__button-submit">GET RECOMMENDATION!</button>
          {/* </Link> */}
          <Link to="/" className="form__button-cancel">
            <p>Cancel</p>
          </Link>
        </div>
      </form>
    </main>
  );
};
export default Questionnaire;
