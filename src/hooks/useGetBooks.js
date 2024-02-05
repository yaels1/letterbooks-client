import axios from "axios";
import { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const useGetBooks = () => {
  const [allBooks, setAllBooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchAllBookData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/letterbooks/book`);
      setAllBooks(response.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllBookData();
  }, []);

  return {
    allBooks,
    isLoading,
    isError,
  };
};

export default useGetBooks;
