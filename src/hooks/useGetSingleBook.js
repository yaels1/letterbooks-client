import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const useGetSingleBook = () => {
  const params = useParams();
  const [singleBook, setSingleBook] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchBookData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/letterbooks/book/${params.id}`
      );
      setSingleBook(response.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  return {
    singleBook,
    isLoading,
    isError,
  };
};

export default useGetSingleBook;
