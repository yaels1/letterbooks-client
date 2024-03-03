import "./RemoveBook.scss";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import useRemoveBooks from "../../hooks/useRemoveBooks";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

const RemoveBook = ({ singleBook }) => {
  // const { deleteWishBook, isLoading, isError } = useRemoveBooks();

  // if (isLoading) return <h1>Loading...</h1>;
  // if (isError) return <h1>Something went wrong, please try again</h1>;
  // console.log(singleBook);

  const navigate = useNavigate();
  const deleteWishBook = async () => {
    const token = localStorage.getItem("tokenlogin");
    const decoded = jwtDecode(token);
    try {
      await axios.delete(`${apiUrl}/letterbooks/list/${decoded.id}/wishlist`, {
        book_id: singleBook.id,
        user_id: decoded.id,
      });
      navigate("/list/wishlist");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="remove">
      <div className="remove__container">
        <button onClick={deleteWishBook} className="remove__button">
          <p>delete {singleBook.title} from wishlist`</p>
        </button>
        <button className="remove__cancel">cancel</button>
      </div>
    </section>
  );
};

export default RemoveBook;
