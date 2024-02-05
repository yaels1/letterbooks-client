import "./AllBooks.scss";

import { NavLink } from "react-router-dom";
import useGetBooks from "../../hooks/useGetBooks";

import BookContainer from "../../components/BookContainer/BookContainer";

const AllBooks = () => {
  const { allBooks, isLoading, isError } = useGetBooks();

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Something went wrong, please try again</h1>;

  return (
    <div className="allbooks">
      {allBooks.map((book) => (
        <NavLink
          to={`/book/${book.id}`}
          key={book.id}
          className="allbooks__container"
        >
          <BookContainer {...book} />
        </NavLink>
      ))}
    </div>
  );
};
export default AllBooks;
