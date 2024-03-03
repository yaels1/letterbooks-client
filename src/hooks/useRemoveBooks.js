import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import useGetSingleBook from "./useGetSingleBook";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const useRemoveBooks = () => {
  const [isLoadingDeleteWish, setIsLoadingDeleteWish] = useState(false);
  const [isErrorDeleteWish, setIsErrorDeleteWish] = useState(false);

  const { singleBook } = useGetSingleBook;

  const deleteWishBook = async () => {
    const token = localStorage.getItem("tokenlogin");
    const decoded = jwtDecode(token);
    setIsLoadingDeleteWish(true);
    try {
      await axios.delete(`${apiUrl}/letterbooks/list/${decoded.id}/wishlist`, {
        book_id: singleBook.id,
        user_id: decoded.id,
      });
    } catch (error) {
      console.error(error);
      setIsErrorDeleteWish(true);
    }
    setIsLoadingDeleteWish(false);
  };

  return { deleteWishBook, isLoadingDeleteWish, isErrorDeleteWish };
};

export default useRemoveBooks;
