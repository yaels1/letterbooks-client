import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const Questionnaire = () => {
  const [fiction, setFiction] = useState(null);
  const [length, setLength] = useState(null);
  const [theme, setTheme] = useState(null);

  const [menu, setMenu] = useState(null);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleFiction = (event) => {
    setFiction(event.target.value);
  };

  const postAnswers = async () => {
    const response = await axios.post(`${apiUrl}/letterbooks/questionnaire`);
    setFiction(response.data);
    setLength(response.data);
    setTheme(response.data);

    console.log(response.data);
  };

  //   const handleLength = (event) => {
  //     setLength(event.target.value);
  //   };
  //   const handleTheme = (event) => {
  //     setTheme(event.target.value);
  //   };

  //   useEffect(() => {
  //     postAnswers();
  //   }, []);

  return (
    <main>
      <h1>wow what a crazy questionnaire</h1>
      <p>wow what a good mini explanation</p>

      <form className="form">
        <div className="form__container">
          <p>question 1</p>

          <label htmlFor="question" className="form__question">
            fiction
            <input
              type="radio"
              name="question1"
              className="form__question-input"
              onChange={handleFiction}
            />
          </label>
          <label htmlFor="question" className="form__question">
            non-fiction
            <input
              type="radio"
              name="question1"
              className="form__question-input"
              onChange={handleFiction}
            />
          </label>
        </div>
        <div className="form__container">
          <p>question 2</p>
          <label htmlFor="question" className="form__question">
            small - less than 500 pages
            <input
              type="radio"
              name="question1"
              className="form__question-input"
              onChange={handleFiction}
            />
          </label>
          <label htmlFor="question" className="form__question">
            medium - between 500 and 800 pages
            <input
              type="radio"
              name="question1"
              className="form__question-input"
              onChange={handleFiction}
            />
          </label>
          <label htmlFor="question" className="form__question">
            large - more than 800 pages
            <input
              type="radio"
              name="question1"
              className="form__question-input"
              onChange={handleFiction}
            />
          </label>
        </div>
        <div className="form__container">
          <p>question 3</p>
        </div>
      </form>
    </main>
  );
};
export default Questionnaire;

{
  /* <button onClick={handleMenu}>Dropdown</button>
{menu ? (
  <ul className="drop">
    <li className="menu-item">
      <button>fiction</button>
    </li>
    <li className="menu-item">
      <button>non-fiction</button>
    </li>
  </ul>
) : null}
{menu ? <div>Is Open</div> : <div>Is Closed</div>} */
}
