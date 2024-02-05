import "./Profile.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SignedOut from "../../components/SignedOut/SignedOut";
import happyBook from "../../assets/images/coffee-book.jpg";
import happyFace from "../../assets/logo/happy-face.svg";
import bookLogo from "../../assets/logo/books-stack-of-three (1).png";

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
    return <SignedOut />;
  }

  if (!user) {
    return (
      <main className="profile">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="profile">
      <h1 className="profile__title">Profile</h1>

      <div className="profile__info">
        <div className="profile__info-text">
          <p>
            Welcome back, {user.first_name} {user.last_name}
          </p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address}</p>
          <p>Age: {user.age}</p>
          <p>You are a {user.role} </p>
          <button className="profile__logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
        <div className="profile__info-text Profile__info-middle">
          <img src={bookLogo} className="profile__info-logo" />
          <p>
            Click on the all books button to go through all the books on this
            site.
          </p>
          <p>
            Add them to your read books list to have a record of your own
            library!
          </p>
          <img src={bookLogo} className="profile__info-logo" />
        </div>
        <div className="profile__info-text Profile__info-img-container">
          <p>Your favourite book is:</p>
          <p> {user.fav_book}</p>
          <p>Here's another nice cosy photo just for fun</p>
          <img src={happyFace} className="profile__info-logo" />
          <img src={happyBook} className="profile__info-img" />
        </div>
      </div>
      <div className="profile__nav">
        <NavLink to="/homepage" className="profile__nav-link">
          HOME
        </NavLink>
        <NavLink to="/list/book" className="profile__nav-link">
          ALL BOOKS
        </NavLink>
        <NavLink to="/list/read" className="profile__nav-link">
          READ BOOKS
        </NavLink>
        <NavLink to="/list/wishlist" className="profile__nav-link">
          WISHLIST
        </NavLink>
        <NavLink to="/questionnaire" className="profile__nav-link">
          QUESTIONNAIRE
        </NavLink>
      </div>
    </main>
  );
}

export default Profile;
