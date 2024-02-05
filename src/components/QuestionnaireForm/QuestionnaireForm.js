import "./QuestionnaireForm.scss";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import useGetTheme from "../../hooks/useGetTheme";
import useAuth from "../../hooks/useAuth";

import SignedOut from "../SignedOut/SignedOut";
import happyFace from "../../assets/logo/smile.svg";

const QuestionnaireForm = ({ setSubmitted, setAnswerBooks }) => {
  const [answer, setAnswer] = useState({
    question1: null,
    question2: null,
    question3: null,
  });
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

  const { listAllBooks, isLoading, isError } = useGetTheme();

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

  // login customhook
  const { user, failedAuth, isAuthLoading } = useAuth();
  if (isLoading || isAuthLoading) return <h1>Loading...</h1>;

  if (failedAuth) {
    return <SignedOut />;
  }

  if (isError) return <h1>Something went wrong, please try again</h1>;

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
            Make your way through the questions, they fill filter out options as
            you answer them,
          </p>
          <p className="intro__text">
            so don't worry if there are no options for the later questions if
            you havent answered he previous one yet.
          </p>
        </div>
      </div>

      <form className="form" onSubmit={submitHandler}>
        <div className="form__nobutton">
          {/* question 1 */}
          <div className="form__container">
            <p className="form__question">Question 1</p>

            <label htmlFor="question1rad1" className="form__question-label">
              Fiction
              <input
                type="radio"
                name="question1"
                id="question1rad1"
                value="fiction"
                className="form__question-input"
                onChange={handleAnswer}
              />
            </label>
            <label htmlFor="question1rad2" className="form__question-label">
              Non-fiction
              <input
                type="radio"
                name="question1"
                id="question1rad2"
                value="non-fiction"
                className="form__question-input"
                onChange={handleAnswer}
              />
            </label>
          </div>

          {/* question 2 */}
          <div className="form__container">
            <p className="form__question">Question 2</p>
            <label htmlFor="question" className="form__label">
              {" "}
              Please select{" "}
            </label>
            <select
              name="question2"
              className="form__question-option"
              onChange={handleAnswer}
            >
              <option className="form__question-option-menu">
                Select Theme ↓{" "}
              </option>
              {menuTheme?.length > 0 &&
                menuTheme.map((themeName) => {
                  return (
                    <option
                      key={themeName}
                      value={themeName}
                      className="form__question-option-menu"
                    >
                      {themeName}
                    </option>
                  );
                })}
            </select>
          </div>

          {/* question 3 */}
          <div className="form__container">
            <p className="form__question">Question 3</p>
            <label htmlFor="question" className="form__label">
              {" "}
              Please select{" "}
            </label>

            <select
              name="question3"
              className="form__question-option"
              onChange={handleAnswer}
            >
              <option value="0" className="form__question-option-menu">
                Select length ↓
              </option>
              {bookLength.areSmallBooks && (
                <option value="small" className="form__question-option-menu">
                  Small
                </option>
              )}
              {bookLength.areMediumBooks && (
                <option value="medium" className="form__question-option-menu">
                  Medium
                </option>
              )}
              {bookLength.areLargeBooks && (
                <option value="large" className="form__question-option-menu">
                  Large
                </option>
              )}
            </select>
          </div>
        </div>
        {/* button */}
        <div className=" form__button">
          <button className="form__button-submit">CLICK HERE!</button>

          <NavLink to="/" className="form__button-cancel">
            <p className="form__button-cancel-text">CANCEL</p>
          </NavLink>
        </div>
      </form>
    </main>
  );
};
export default QuestionnaireForm;
