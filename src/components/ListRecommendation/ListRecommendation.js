import "./ListRecommendation.scss";
import { Link } from "react-router-dom";

const ListRecommendation = () => {
  const str = localStorage.getItem("bookRecs");
  const bookRecList = JSON.parse(str);

  console.log(bookRecList);

  return (
    <div className="results">
      {bookRecList.map((book) => (
        <Link
          to={`/book/${book.id}`}
          key={book.id}
          className="results__container"
        >
          <img src={book.image} className="results__image" alt="" />
          <div>
            <p className="results__text results__title">Title: {book.title}</p>
            <p className="results__text results__author">Author: {book.name}</p>
            <p className="results__text results__pages">
              No. of Pages: {book.pages}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListRecommendation;
