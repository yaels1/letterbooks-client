import "./ListRecommendation.scss";
import { NavLink } from "react-router-dom";
import EmptyList from "../EmptyList/EmptyList";
import BookContainer from "../BookContainer/BookContainer";

const ListRecommendation = () => {
  const str = localStorage.getItem("bookRecs");
  const bookRecList = JSON.parse(str);

  if (!bookRecList) return <EmptyList />;

  return (
    <>
      <h2 className="title">Book Recommendations</h2>
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
              <BookContainer {...book} />
            </NavLink>
          ))
        )}
      </div>
    </>
  );
};

export default ListRecommendation;
