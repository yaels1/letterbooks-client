import "./SingleBook.scss";
import axios from "axios";
import { useState } from "react";
import useGetSingleBook from "../../hooks/useGetSingleBook";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const SingleBook = () => {
  const { singleBook, isLoading, isError } = useGetSingleBook();

  const navigate = useNavigate();
  const token = localStorage.getItem("tokenlogin");

  const addBook = async () => {
    const decoded = jwtDecode(token);
    try {
      await axios.post(`${apiUrl}/letterbooks/list/read`, {
        book_id: singleBook.id,
        user_id: decoded.id,
      });

      navigate("/list");
    } catch (error) {
      console.error(error);
    }
  };

  const addWishBook = async () => {
    const decoded = jwtDecode(token);
    try {
      await axios.post(`${apiUrl}/letterbooks/list/wishlist`, {
        book_id: singleBook.id,
        user_id: decoded.id,
      });

      navigate("/list");
    } catch (error) {
      console.error(error);
    }
  };

  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("tokenlogin");

    return token?.length > 0;
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something went wrong, please try again</h1>;

  return (
    <main>
      {!loggedIn && (
        <div className="book">
          <div className="book__container">
            <div className="book__container-column">
              <img className="book__image" src={singleBook.image} alt="" />
              <div className="book__container-text">
                <p className="book__text book__title">{singleBook.title}</p>
                <p className="book__text book__author">{singleBook.name}</p>
                <p className="book__text book__summary book__summary--desktop">
                  {singleBook.summary}
                </p>
              </div>
            </div>
            <p className=" book__summary">{singleBook.summary}</p>
          </div>
        </div>
      )}

      {loggedIn && (
        <div className="book">
          <div className="book__container">
            <div className="book__container-column">
              <img className="book__image" src={singleBook.image} alt="" />
              <div className="book__container-text">
                <p className="book__text book__title">{singleBook.title}</p>
                <p className="book__text book__author">{singleBook.name}</p>
                <p className="book__text book__summary book__summary--desktop">
                  {singleBook.summary}
                </p>
              </div>
            </div>
            <p className=" book__summary">{singleBook.summary}</p>
          </div>
          <div className="book__buttons">
            <button onClick={addBook} className="book__button">
              <p className="book__button-text">MOVE TO READ BOOKS</p>
            </button>

            <button onClick={addWishBook} className="book__button">
              <p className="book__button-text">MOVE TO WISHLIST</p>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default SingleBook;
