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

  if (!book) return <h1>Loading...</h1>;
  return (
    <main>
      <div className="book">
        <img className="book__cover" alt="book cover" src={book.image} />
        <p className="book__title">{book.title}</p>
        <p className="book__author">{book.name}</p>
        <p className="book__summary">{book.summary}</p>
      </div>
    </main>
  );
};

export default SingleBook;
