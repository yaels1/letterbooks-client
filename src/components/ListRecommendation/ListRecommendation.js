import "./ListRecommendation.scss";
import { Link } from "react-router-dom";
import EmptyList from "../EmptyList/EmptyList";
import BookContainer from "../BookContainer/BookContainer";
import useGetRecsBooks from "../../hooks/useGetRecsBooks";

const ListRecommendation = () => {
  // const str = localStorage.getItem("bookRecs");
  // const bookRecList = JSON.parse(str);

  const { recsBooks, isLoading, isError } = useGetRecsBooks();
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something went wrong, please try again</h1>;

  // if (!bookRecList) return <EmptyList />;

  return (
    <>
      <h2 className="title">Book Recommendations</h2>
      <div className="results">
        {recsBooks.length < 1 ? (
          <EmptyList />
        ) : (
          recsBooks.map((book) => (
            <Link
              to={`/book/${book.id}`}
              key={book.id}
              className="results__container"
            >
              <BookContainer {...book} />
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default ListRecommendation;
