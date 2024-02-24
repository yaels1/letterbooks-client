import axios from "axios";
import { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const useRemoveBooks = () => {
  const [removeBook, setRemoveBook] = usestate(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const DeleteBook = async () => {
    const token = localStorage.getItem("tokenlogin");
    const decoded = jwtDecode(token);
    await axios.delete(`${apiUrl}/letterbooks/list/${decoded.id}/wishlist`);
  };
};
