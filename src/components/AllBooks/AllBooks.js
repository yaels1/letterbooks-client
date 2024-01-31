import "./AllBooks.scss";

import axios from "axios";
import { useState, useEffect } from "react";

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
        <div key={aBook.id} className="allbooks__container">
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
        </div>
      ))}
    </div>
  );
};
export default AllBooks;
