import "./Book.scss";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      {allBooks.map((aBook) => (
        <Link
          to={`/book/${aBook.id}`}
          key={aBook.id}
          className="allbooks__container"
        >
          <img src={aBook.image} className="allbooks__image" />
          <div>
            <p className="allbooks__text allbooks__title">
              Title: {aBook.title}
            </p>
            <p className="allbooks__text allbooks__author">
              Author: {aBook.name}
            </p>
            <p className="allbooks__text allbooks__pages">
              No. of Pages: {aBook.pages}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default AllBooks;
