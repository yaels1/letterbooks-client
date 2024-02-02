import "./SingleBook.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const SingleBook = () => {
  const params = useParams();
  const [book, setBook] = useState(null);

  const navigate = useNavigate();

  const fetchBookData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/letterbooks/book/${params.id}`
      );
      setBook(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  console.log(book);

  const addBook = async (event) => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    console.log(decoded);

    try {
      const response = await axios.post(`${apiUrl}/letterbooks/list/read`, {
        book_id: book.id,
        user_id: decoded.id,
      });

      navigate("/list");
    } catch (error) {
      console.error(error);
    }
  };

  if (!book) return <h1>Loading...</h1>;
  return (
    <main>
      <div className="book">
        <div className="book__container">
          <img className="book__image" src={book.image} alt="" />
          <div className="book__container-text">
            <p className="book__text book__title">{book.title}</p>
            <p className="book__text book__author">{book.name}</p>
            <p className="book__text book__summary">{book.summary}</p>
          </div>
        </div>
        <button onClick={addBook} className="book__button">
          <p className="book__button-text">ADD BOOK TO LIST OF READ BOOKS</p>
        </button>
      </div>
    </main>
  );
};

export default SingleBook;
