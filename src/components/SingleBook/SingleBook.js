import "./SingleBook.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const SingleBook = () => {
  const params = useParams();
  const [book, setBook] = useState(null);

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

  const addBook = async () => {
    const response = await axios.post(`${apiUrl}/letterbooks/book`);
  };

  if (!book) return <h1>Loading...</h1>;
  return (
    <main>
      <div className="book">
        <img className="book__cover" src={book.image} alt="" />
        <p className="book__title">{book.title}</p>
        <p className="book__author">{book.name}</p>
        <p className="book__summary">{book.summary}</p>

        <div className="book-button">
          <p className="book__button-text">add book to list of read books</p>
        </div>
      </div>
    </main>
  );
};

export default SingleBook;
