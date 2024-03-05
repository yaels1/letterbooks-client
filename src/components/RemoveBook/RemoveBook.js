import "./RemoveBook.scss";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

import useGetWishBook from "../../hooks/useGetWishBook";
// import useRemoveBooks from "../../hooks/useRemoveBooks";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const RemoveBook = ({ singleBook, list, handleClose, process, isDelete }) => {
  return (
    <section className="remove">
      <div className="remove__container">
        <button onClick={process} className="remove__button">
          <p>
            delete {singleBook.title} from {list} list`
          </p>
        </button>
        <a to="/list/wishlist" onClick={handleClose} className="remove__cancel">
          cancel
        </a>
      </div>
    </section>
  );
  // }
};

export default RemoveBook;
