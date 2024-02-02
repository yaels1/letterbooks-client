// read books list
// book recs list
// all books list?
import "./Lists.scss";
import { NavLink } from "react-router-dom";

const Lists = () => {
  return (
    <main className="list">
      <h1>Lists</h1>
      <div className="list__container">
        <NavLink to="/list/book" className="list__title">
          <p>List of all books</p>
        </NavLink>
      </div>
      <div className="list__container">
        <NavLink to="/list/read" className="list__title">
          <p>List of books you've read</p>
        </NavLink>
      </div>

      <div className="list__container">
        <NavLink to="/list/recommendations" className="list__title">
          <p c>List of book recommendations</p>
        </NavLink>
      </div>
    </main>
  );
};
export default Lists;
