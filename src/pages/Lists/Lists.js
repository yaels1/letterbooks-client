// read books list
// book recs list
// all books list?
import "./Lists.scss";
import { Link } from "react-router-dom";

const Lists = () => {
  return (
    <main className="list">
      <h1>Lists</h1>
      <div className="list__container">
        <Link to="/list/book">
          <p className="list__title">List of all books</p>
        </Link>
      </div>
      <div className="list__container">
        <Link to="/list/read">
          <p className="list__title">List of books you've read</p>
        </Link>
      </div>

      <div className="list__container">
        <Link to="/list/recommendations">
          <p className="list__title">List of book recommendations</p>
        </Link>
      </div>
    </main>
  );
};
export default Lists;
