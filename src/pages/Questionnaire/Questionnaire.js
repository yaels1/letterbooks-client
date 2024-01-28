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

  //   filter through questions for themes
  useEffect(() => {
    // console.log(answer.question1);
    // console.log(answer.question2);
    // console.log(answer.question3);

    // filter for theme
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

    setMenuTheme(themes);
  }, [answer.question1]);

  useEffect(() => {
    if (!answer.question2) {
      return;
    }

    const filteredBookLength = listAllBooks.filter((book) => {
      if (
        answer.question1 == "fiction" &&
        book.fiction &&
        book.themes.includes(answer.question2)
      ) {
        return true;
      }

      if (
        answer.question1 == "non-fiction" &&
        !book.fiction &&
        book.themes.includes(answer.question2)
      ) {
        return true;
      }
    });

    console.log(filteredBookLength);

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
      try {
        const response = await axios.post(
          `${apiUrl}/letterbooks/questionnaire`
        );
        navigate("/list/recommendations");
        setAnswer(response.data);
        // console.log(response.data);
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
            {bookLength.areSmallBooks && <option>Small</option>}
            {bookLength.areMediumBooks && <option>Medium</option>}
            {bookLength.areLargeBooks && <option>Large</option>}
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
