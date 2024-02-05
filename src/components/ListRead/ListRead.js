import "./ListRead.scss";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import EmptyList from "../EmptyList/EmptyList";
import BookContainer from "../BookContainer/BookContainer";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const ListRead = () => {
  const [readBooks, setReadBooks] = useState(null);

  const fetchReadBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);

      const response = await axios.get(
        `${apiUrl}/letterbooks/list/${decoded.id}/read`
      );
      setReadBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReadBooks();
  }, []);

  if (!readBooks) return <h1>Loading...</h1>;

  return (
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
  );
};
export default ListRead;
