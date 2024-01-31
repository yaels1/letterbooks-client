import "./QuestionnaireForm.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const QuestionnaireForm = ({ setSubmitted, setAnswerBooks }) => {
  const [answer, setAnswer] = useState({
    question1: null,
    question2: null,
    question3: null,
  });
  const [listAllBooks, setListAllBooks] = useState([]);
  const [menuTheme, setMenuTheme] = useState([]);
  const [bookLength, setBookLength] = useState({
    areSmallBooks: false,
    areMediumBooks: false,
    areLargeBooks: false,
  });

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

  function filterByFiction(books) {
    return books.filter((book) => {
      if (answer.question1 === "fiction" && book.fiction) {
        return book;
      } else if (answer.question1 === "non-fiction" && !book.fiction) {
        return book;
      }
    });
  }

  //   filter through questions for themes
  useEffect(() => {
    // console.log(answer.question1);
    // console.log(answer.question2);
    // console.log(answer.question3);

    // filter for theme
    const filteredBooksTheme = filterByFiction(listAllBooks);
    const themes = new Array(
      ...new Set(filteredBooksTheme.map((book) => book.themes).flat())
    );

    setMenuTheme(themes);
  }, [answer.question1]);

  function filterByTheme(books, theme) {
    return books.filter((book) => book.themes.includes(theme));
  }

  function filterBySize(books, size) {
    return books.filter((book) => {
      if (size === "small" && book.pages < 500) {
        return true;
      }

      if (size === "medium" && book.pages > 500 && book.pages < 800) {
        return true;
      }

      if (size === "large" && book.pages > 800) {
        return true;
      }
    });
  }

  useEffect(() => {
    if (!answer.question2) {
      return;
    }

    const filteredBookLength = filterByTheme(
      filterByFiction(listAllBooks),
      answer.question2
    );

    const areSmallBooks = filteredBookLength.some((book) => book.pages < 500);
    const areMediumBooks = filteredBookLength.some(
      (book) => book.pages > 500 && book.pages < 800
    );
    const areLargeBooks = filteredBookLength.some((book) => book.pages > 800);

    setBookLength({ areSmallBooks, areMediumBooks, areLargeBooks });
  }, [answer.question2]);

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
      const selectedBooks = filterBySize(
        filterByTheme(filterByFiction(listAllBooks), answer.question2),
        answer.question3
      );

      setAnswerBooks(selectedBooks);
      setSubmitted(true);
      // console.log(response.data);
    } else {
      console.log("pls answer all necessary questions");
    }
  };

  return (
    <main>
      <div className="intro">
        <h1>wow what a crazy questionnaireForm</h1>
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
            {bookLength.areSmallBooks && <option value="small">Small</option>}
            {bookLength.areMediumBooks && (
              <option value="medium">Medium</option>
            )}
            {bookLength.areLargeBooks && <option value="large">Large</option>}
          </select>
        </div>

        <div className="form__container form__button">
          <button className="form__button-submit">GET RECOMMENDATION!</button>

          <Link to="/" className="form__button-cancel">
            <p>Cancel</p>
          </Link>
        </div>
      </form>
    </main>
  );
};
export default QuestionnaireForm;
