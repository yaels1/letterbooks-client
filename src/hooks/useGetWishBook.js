import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const useGetWishBook = () => {
  const [wishlistBooks, setWishlistBooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchWishlistBooks = async () => {
    try {
      const token = localStorage.getItem("tokenlogin");
      const decoded = jwtDecode(token);

      const response = await axios.get(
        `${apiUrl}/letterbooks/list/${decoded.id}/wishlist`
      );

      setWishlistBooks(response.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWishlistBooks();
  }, []);

  return { wishlistBooks, isLoading, isError };
};

export default useGetWishBook;
