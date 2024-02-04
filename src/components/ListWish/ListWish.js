import "./ListWish.scss";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import EmptyList from "../EmptyList/EmptyList";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const ListWish = () => {
  const [wishlistBooks, setWishlistBooks] = useState(null);

  const fetchWishlistBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      console.log(decoded);

      const response = await axios.get(
        `${apiUrl}/letterbooks/list/${decoded.id}/wishlist`
      );
      setWishlistBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWishlistBooks();
  }, []);

  if (!wishlistBooks) return <h1>Loading...</h1>;

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
            <img src={book.image} className="wishlist__image" alt="" />
            <div className="wishlist__info">
              <p className="wishlist__text read__title">Title: {book.title}</p>
              <p className="wishlist__text read__author">Author: {book.name}</p>
              <p className="wishlist__text read__pages">
                No. of Pages: {book.pages}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ListWish;
