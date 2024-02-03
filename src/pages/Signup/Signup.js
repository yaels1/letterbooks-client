import "./Signup.scss";
import Input from "../../components/Input/Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${apiUrl}/letterbooks/users/register`, {
        email: event.target.email.value,
        password: event.target.password.value,
        first_name: event.target.first_name.value,
        last_name: event.target.last_name.value,
        age: event.target.age.value,
        phone: event.target.phone.value,
        fav_book: event.target.fav_book.value,
        address: event.target.address.value,
      });
      navigate("/login");
    } catch (error) {
      event.target.reset();
      console.log(error.response.data);
      setError(error.response.data);
    }
  };

  return (
    <main className="signup">
      <form className="signup__form" onSubmit={handleSubmit}>
        <h1 className="signup__title">Sign up</h1>
        <Input type="text" name="first_name" label="First name" />
        <Input type="text" name="last_name" label="Last name" />
        <Input type="text" name="phone" label="Phone" />
        <Input type="text" name="age" label="Age" />
        <Input type="text" name="address" label="Address" />
        <Input type="text" name="fav_book" label="Favourite book" />
        <Input type="text" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />
        <button className="signup__button">Sign up</button>
        {error && <div className="signup__message">{error.message}</div>}
      </form>

      <p className="signup__no">
        Have an account?{" "}
        <Link to="/login" className="signup__no-link">
          Log in
        </Link>
      </p>
    </main>
  );
}

export default Signup;
