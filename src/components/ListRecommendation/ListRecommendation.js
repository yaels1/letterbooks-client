import "./ListRecommendation.scss";
import { NavLink } from "react-router-dom";
import EmptyList from "../EmptyList/EmptyList";

const ListRecommendation = () => {
  const str = localStorage.getItem("bookRecs");
  const bookRecList = JSON.parse(str);

  console.log(bookRecList);

  if (!bookRecList) return <EmptyList />;

  return (
    <div className="results">
      {bookRecList.length < 1 ? (
        <EmptyList />
      ) : (
        bookRecList.map((book) => (
          <NavLink
            to={`/book/${book.id}`}
            key={book.id}
            className="results__container"
          >
            <img src={book.image} className="results__image" alt="" />
            <div className="results__info">
              <p className="results__text results__title">
                Title: {book.title}
              </p>
              <p className="results__text results__author">
                Author: {book.name}
              </p>
              <p className="results__text results__pages">
                No. of Pages: {book.pages}
              </p>
            </div>
          </NavLink>
        ))
      )}
    </div>
  );
};

export default ListRecommendation;
