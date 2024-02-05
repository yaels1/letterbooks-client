import "./AllBooks.scss";

import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import BookContainer from "../../components/BookContainer/BookContainer";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState(null);

  const fetchAllBookData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/letterbooks/book`);
      setAllBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAllBookData();
  }, []);

  if (!allBooks) return <h1>Loading...</h1>;

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

{
  /* <img src={aBook.image} className="allbooks__image" />
          <div className="allbooks__info">
            <p className="allbooks__text allbooks__title">
              Title: {aBook.title}
            </p>
            <p className="allbooks__text allbooks__author">
              Author: {aBook.name}
            </p>
            <p className="allbooks__text allbooks__pages">
              No. of Pages: {aBook.pages}
            </p>
            <p className="allbooks__text allbooks__themes">
              Themes: {aBook.themes.join(", ")}
            </p>
          </div> */
}
