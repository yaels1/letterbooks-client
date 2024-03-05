import "./SingleBook.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import useGetSingleBook from "../../hooks/useGetSingleBook";
import useGetWishBook from "../../hooks/useGetWishBook";
import useGetReadBook from "../../hooks/useGetReadBook";

import RemoveBook from "../RemoveBook/RemoveBook";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { type } from "@testing-library/user-event/dist/type";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const SingleBook = () => {
  const { singleBook, isLoading, isError } = useGetSingleBook();
  const { wishlistBooks } = useGetWishBook();
  const { readBooks } = useGetReadBook();
  const [isDelete, setIsDelete] = useState(false);
  const [isPresentRead, setIsPresentRead] = useState(undefined);
  const [isPresentWish, setIsPresentWish] = useState(undefined);
  const [isPresentLoading, setIsPresentLoading] = useState(true);

  const { user } = useAuth();

  const navigate = useNavigate();
  const token = localStorage.getItem("tokenlogin");

  const decoded = jwtDecode(token);

  const addBook = async () => {
    try {
      await axios.post(`${apiUrl}/letterbooks/list/read`, {
        book_id: singleBook.id,
        user_id: decoded.id,
      });

      navigate("/list");
    } catch (error) {
      console.error(error);
    }
  };

  const addWishBook = async () => {
    try {
      await axios.post(`${apiUrl}/letterbooks/list/wishlist`, {
        book_id: singleBook.id,
        user_id: decoded.id,
      });

      navigate("/list");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (singleBook) => {
    setIsDelete(true);
  };

  const handleClose = () => {
    setIsDelete(false);
  };

  const deleteWishBook = async () => {
    const token = localStorage.getItem("tokenlogin");
    const decoded = jwtDecode(token);
    try {
      await axios.delete(`${apiUrl}/letterbooks/list/wishlist`, {
        book_id: singleBook.id,
        user_id: decoded.id,
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReadBook = async () => {
    const token = localStorage.getItem("tokenlogin");
    const decoded = jwtDecode(token);
    try {
      await axios.delete(`${apiUrl}/letterbooks/list/${decoded.id}/read`, {
        book_id: singleBook.id,
        user_id: decoded.id,
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBoth = deleteReadBook && deleteWishBook;

  useEffect(() => {
    setIsPresentRead(readBooks?.some((book) => book.id === singleBook.id));
    setIsPresentWish(wishlistBooks?.some((book) => book.id === singleBook.id));
    setIsPresentLoading(false);
    console.log(isPresentWish);
  }, [singleBook, readBooks, wishlistBooks]);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Something went wrong, please try again</h1>;

  return (
    <main>
      {!user && (
        <div className="book">
          <div className="book__container">
            <div className="book__container-column">
              <img className="book__image" src={singleBook.image} alt="" />
              <div className="book__container-text">
                <p className="book__text book__title">{singleBook.title}</p>
                <p className="book__text book__author">{singleBook.name}</p>
                <p className="book__text book__summary book__summary--desktop">
                  {singleBook.summary}
                </p>
              </div>
            </div>
            <p className=" book__summary">{singleBook.summary}</p>
          </div>
        </div>
      )}

      {user && (
        <div className="book">
          <div className="book__container">
            <div className="book__container-column">
              <img className="book__image" src={singleBook.image} alt="" />
              <div className="book__container-text">
                <p className="book__text book__title">{singleBook.title}</p>
                <p className="book__text book__author">{singleBook.name}</p>
                <p className="book__text book__summary book__summary--desktop">
                  {singleBook.summary}
                </p>
              </div>
            </div>
            <p className=" book__summary">{singleBook.summary}</p>
            {isLoading && <p>Loading book information...</p>}
          </div>

          {!isLoading && (
            <div className="book__buttons">
              <div className="book__read">
                {/* Button to move to read list*/}
                {!isPresentRead && (
                  <button onClick={addBook} className="book__button">
                    <p className="book__button-text">Main MOVE TO READ BOOKS</p>
                  </button>
                )}
                {/* Remove book from read list */}
                {isPresentRead && (
                  <>
                    <p>this book is in the readbooks list</p>
                    <RemoveBook
                      singleBook={singleBook}
                      list="read"
                      handleClose={handleClose}
                      isDelete={isDelete}
                      process={deleteReadBook}
                    />
                  </>
                )}
              </div>

              <div className="book__wish">
                {/* Button to move to wishlist  */}
                {!isPresentWish && (
                  <button onClick={addWishBook} className="book__button">
                    <p className="book__button-text">Main MOVE TO WISHLIST</p>
                  </button>
                )}
                {/* Button to delete from wishlist */}

                {isPresentWish && (
                  <>
                    <p>this book is in the wishlist</p>
                    <RemoveBook
                      singleBook={singleBook}
                      list={isPresentRead ? "both" : "wish"}
                      process={deleteWishBook}
                      handleClose={handleClose}
                      isDelete={isDelete}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default SingleBook;

{
  /* <div className="book__buttons">
            <div className="book__read">
              {inRead && inBoth() ? (
                <RemoveBook
                  singleBook={singleBook}
                  list="read"
                  handleClose={handleClose}
                  isDelete={isDelete}
                  process={deleteReadBook}
                />
              ) : (
                <button onClick={addBook} className="book__button">
                  <p className="book__button-text">main MOVE TO READ BOOKS</p>
                </button>
              )}
            </div>

            <div className=" book__wish">
              {inWish ? (
                <RemoveBook
                  singleBook={singleBook}
                  list="wish"
                  process={deleteWishBook}
                  handleClose={handleClose}
                  isDelete={isDelete}
                />
              ) : (
                <button onClick={addWishBook} className="book__button">
                  <p className="book__button-text">main MOVE TO WISHLIST</p>
                </button>
              )}
            </div>
          </div> */
}

// const inNeither = () => {
//   if (!isPresentWish && !isPresentRead) {
//   }
// };

// const inRead = () => {
//   if (!isPresentWish && isPresentRead) {
//   }
// };

// const inWish = () => {
//   if (isPresentWish && !isPresentRead) {
//   }
// };

// const inBoth = () => {
//   if (isPresentWish && isPresentRead) {
//   }
// };
