import "./ListRead.scss";

import { Link } from "react-router-dom";

import EmptyList from "../EmptyList/EmptyList";
import BookContainer from "../BookContainer/BookContainer";
import useGetReadBook from "../../hooks/useGetReadBook";

const ListRead = () => {
  const { readBooks, isLoading, isError } = useGetReadBook();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something went wrong, please try again</h1>;

  return (
    <>
      <h2 className="title">Read Books</h2>
      <div className="read">
        {readBooks.length < 1 ? (
          <EmptyList />
        ) : (
          readBooks.map((book) => (
            <Link
              to={`/book/${book.id}`}
              key={book.id}
              className="read__container"
            >
              <BookContainer {...book} />
            </Link>
          ))
        )}
      </div>
    </>
  );
};
export default ListRead;
