import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const useGetTheme = () => {
  const [listAllBooks, setListAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchThemes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/letterbooks/book`);
      setListAllBooks(response.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  return { listAllBooks, isLoading, isError };
};

export default useGetTheme;
