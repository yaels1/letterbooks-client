import "./QuestionnaireForm.scss";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import happyFace from "../../assets/logo/smile.png";
import sadFace from "../../assets/logo/sad-face.png";
import arrowRight from "../../assets/logo/arrow-right.png";
import arrowLeft from "../../assets/logo/arrow-left.png";

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

  //   filter through q1 response for themes
  useEffect(() => {
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
      if (size === "small" && book.pages < 350) {
        return true;
      }

      if (size === "medium" && book.pages > 350 && book.pages < 550) {
        return true;
      }

      if (size === "large" && book.pages > 550) {
        return true;
      }
    });
  }

  // filter through q2 response for length
  useEffect(() => {
    if (!answer.question2) {
      return;
    }

    const filteredBookLength = filterByTheme(
      filterByFiction(listAllBooks),
      answer.question2
    );

    const areSmallBooks = filteredBookLength.some((book) => book.pages < 350);
    const areMediumBooks = filteredBookLength.some(
      (book) => book.pages > 350 && book.pages < 550
    );
    const areLargeBooks = filteredBookLength.some((book) => book.pages > 550);

    setBookLength({ areSmallBooks, areMediumBooks, areLargeBooks });
  }, [answer.question2]);

  // check if all questions answered
  const isFormValid = () => {
    if (!answer.question1 || !answer.question2 || !answer.question3) {
      console.log("Please answer all the questions");
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
      localStorage.setItem("bookRecs", JSON.stringify(selectedBooks));
      setSubmitted(true);
    } else {
      console.log("pls answer all necessary questions");
    }
  };

  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  // if logged in or out
  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return setFailedAuth(true);
      }

      try {
        const { data } = await axios.get(
          `${apiUrl}/letterbooks/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(data);
      } catch (error) {
        console.log(error);
        setFailedAuth(true);
      }
    };
    loadData();
  }, []);

  if (failedAuth) {
    return (
      <main className="Profile__no">
        <p>You must be logged in to see this page.</p>
        <img src={sadFace} className="Profile__no-logo" />

        <div className="Profile__no-login">
          <img src={arrowRight} className="Profile__no-arrow" />
          <NavLink to="/login" className="Profile__no-link">
            Log in
          </NavLink>
          <img src={arrowLeft} className="Profile__no-arrow" />
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="intro">
        <h1 className="intro__header">
          <img src={happyFace} className="intro__header-logo" />
          Here we go!
        </h1>
        <div className="intro__text-container">
          <p className="intro__text">
            Here is a mini questionnaire to help figure out the best book for
            you.
          </p>
          <p className="intro__text">
            Make your way through the questions, they fill filter out as you
            answer them,
          </p>
          <p className="intro__text">
            so don't worry if there are no options for the later questions if
            you havent answered he previous one
          </p>
          <p>to do: randomizer and maybe max of 5 book recs for each request</p>
        </div>
      </div>

      <form className="form" onSubmit={submitHandler}>
        {/* question 1 */}
        <div className="form__container">
          <p className="form__question">Question 1</p>

          <label htmlFor="question" className="form__question-label">
            Fiction
            <input
              type="radio"
              name="question1"
              value="fiction"
              className="form__question-input"
              onChange={handleAnswer}
            />
          </label>
          <label htmlFor="question" className="form__question-label">
            Non-fiction
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
          <p className="form__question">Question 2</p>
          <label htmlFor="question"> Please select </label>
          <select
            name="question2"
            className="form__question-option"
            onChange={handleAnswer}
          >
            <option className="form__question-option">Select Theme ↓ </option>
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
          <p className="form__question">Question 3</p>
          <label htmlFor="question"> Please select </label>

          <select
            name="question3"
            className="form__question-option"
            onChange={handleAnswer}
          >
            <option value="0" className="form__question-option">
              select length ↓
            </option>
            {bookLength.areSmallBooks && <option value="small">Small</option>}
            {bookLength.areMediumBooks && (
              <option value="medium">Medium</option>
            )}
            {bookLength.areLargeBooks && <option value="large">Large</option>}
          </select>
        </div>

        {/* button */}
        <div className=" form__button">
          <button className="form__button-submit">CLICK HERE!</button>

          <NavLink to="/" className="form__button-cancel">
            <p className="form__button-cancel-text">Cancel</p>
          </NavLink>
        </div>
      </form>
    </main>
  );
};
export default QuestionnaireForm;
