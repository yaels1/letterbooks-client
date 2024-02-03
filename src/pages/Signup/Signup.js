import "./Signup.scss";
import Input from "../../components/Input/Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import FormError from "../../components/FormError/FormError";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

function Signup() {
  const [error, setError] = useState("");

  const [formDetails, setFormDetails] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    age: "",
    address: "",
    fav_book: "",
    email: "",
    password: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormDetails({
      ...formDetails,
      [event.target.name]: event.target.value,
    });
  };

  const formValidation = () => {
    const {
      first_name,
      last_name,
      phone,
      age,
      address,
      fav_book,
      email,
      password,
    } = formDetails;
    if (
      !first_name ||
      !last_name ||
      !phone ||
      !age ||
      !address ||
      !fav_book ||
      !email ||
      !password
    )
      return <FormError />;
  };

  const emailError = !formDetails.email.includes("@")
    ? "please enter a valid email address"
    : null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormSubmitted(true);

    const validationError = formValidation();
    if (validationError) {
      setError(validationError.props.children);
      return;
    }

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
      console.log(error.response.data);
      setError(error.response.data);
    }
  };

  return (
    <main className="signup">
      <form className="signup__form" onSubmit={handleSubmit}>
        <h1 className="signup__title">Sign up</h1>
        <Input
          type="text"
          name="first_name"
          label="First name"
          onChange={handleChange}
        />

        <Input
          type="text"
          name="last_name"
          label="Last name"
          onChange={handleChange}
        />
        <Input type="text" name="phone" label="Phone" onChange={handleChange} />
        <Input type="text" name="age" label="Age" onChange={handleChange} />
        <Input
          type="text"
          name="address"
          label="Address"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="fav_book"
          label="Favourite book"
          onChange={handleChange}
        />
        <Input type="text" name="email" label="Email" onChange={handleChange} />
        {formSubmitted && emailError && (
          <p className="signup__error">{emailError}</p>
        )}
        <Input
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
        />
        <button type="submit" className="signup__button">
          Sign up
          {!formDetails && (
            <div>
              <p>you must fill out all of the fields</p>
            </div>
          )}
        </button>

        {formSubmitted && formValidation()}
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
