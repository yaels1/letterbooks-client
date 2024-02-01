import "./Profile.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import happyBook from "../../assets/images/coffee-book.jpg";
import happyFace from "../../assets/logo/happy-face.png";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

function Profile() {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return setFailedAuth(true);
      }

      try {
        const { data } = await axios.get(
          `${apiUrl}/letterbooks/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
        setFailedAuth(true);
      }
    };
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    return (
      <main className="Profile">
        <p>You must be logged in to see this page.</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="Profile">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="Profile">
      <h1 className="Profile__title">Profile</h1>

      <div className="Profile__info">
        <div className="Profile__info-text">
          <p>
            Welcome back, {user.first_name} {user.last_name}
          </p>

          <h2>My Profile</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address}</p>
          <p>Age: {user.age}</p>
          <p>You are a {user.role} </p>
          <button className="Profile__logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
        <div className="Profile__info-img-container">
          <p>your favourite book is</p>
          <p>fav book: {user.fav_book}</p>
          <p>here's another nice cosy photo</p>
          <img src={happyFace} className="Profile__info-logo" />
          <img src={happyBook} className="Profile__info-img" />
        </div>
      </div>
      <div className="Profile__nav">
        <NavLink to="/homepage" className="Profile__nav-link">
          home
        </NavLink>
        <NavLink to="/list/book" className="Profile__nav-link">
          all books
        </NavLink>
        <NavLink to="/list/read" className="Profile__nav-link">
          read books
        </NavLink>
        <NavLink to="/questionnaire" className="Profile__nav-link">
          questionnaire
        </NavLink>
      </div>
    </main>
  );
}

export default Profile;
