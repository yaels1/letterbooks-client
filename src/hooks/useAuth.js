import { useEffect, useState } from "react";

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const tokenlogin = localStorage.getItem("tokenlogin");

      if (!tokenlogin) {
        setFailedAuth(true);
        setIsAuthLoading(false);
        return;
      }

      const token = tokenlogin;

      try {
        console.log("Doing request with:" + token);
        const { data } = await axios.get(
          `${apiUrl}/letterbooks/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(data);
        // console.log(data, "error?");
      } catch (error) {
        console.error(error);
        // console.log(error, "this is error");
        setFailedAuth(true);
      } finally {
        setIsAuthLoading(false);
      }
    };
    loadData();
  }, []);

  return { user, failedAuth, isAuthLoading };
};

export default useAuth;
