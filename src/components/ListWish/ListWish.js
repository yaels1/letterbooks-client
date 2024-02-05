import "./ListWish.scss";

import { Link } from "react-router-dom";

import EmptyList from "../EmptyList/EmptyList";
import BookContainer from "../BookContainer/BookContainer";
import useGetWishBook from "../../hooks/useGetWishBook";

const ListWish = () => {
  const { wishlistBooks, isLoading, isError } = useGetWishBook();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something went wrong, please try again</h1>;

  return (
    <div className="wishlist">
      {wishlistBooks.length < 1 ? (
        <EmptyList />
      ) : (
        wishlistBooks.map((book) => (
          <Link
            to={`/book/${book.id}`}
            key={book.id}
            className="wishlist__container"
          >
            <BookContainer {...book} />
          </Link>
        ))
      )}
    </div>
  );
};

export default ListWish;
