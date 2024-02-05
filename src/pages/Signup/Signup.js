import "./Signup.scss";
import Input from "../../components/Input/Input";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import FormError from "../../components/FormError/FormError";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

function Signup() {
  const [error, setError] = useState({});

  const [formDetails, setFormDetails] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    age: "",
    address: "",
    fav_book: "",
    email: "",
    password: "",
    confirm_password: "",
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
    const formErrors = {};
    // email @
    if (!formDetails["email"].includes("@")) {
      formErrors["email"] = true;
    }

    // password one capital letter
    if (!formDetails["password"].match(/[A-Z]/)) {
      formErrors["password"] = true;
    }

    // password one special character
    if (!formDetails["password"].match(/[^a-zA-Z0-9_]/)) {
      formErrors["password"] = true;
    }

    // password one number
    if (!formDetails["password"].match(/[0-9]/)) {
      formErrors["password"] = true;
    }

    // password min 10 characters
    if (!formDetails["password"].length > 10) {
      formErrors["password"] = true;
    }

    // phone is 11 digits
    if (!formDetails["phone"].length === 11) {
      formErrors["phone"] = true;
    }

    // age is above 5 but below 120
    if (Number(formDetails["age"]) > 120 || Number(formDetails["age"]) < 5) {
      formErrors["age"] = true;
    }

    if (formDetails["confirm_password"] !== formDetails["password"]) {
      formErrors["confirm_password"] = true;
    }

    Object.keys(formDetails).forEach((field) => {
      const isError = formDetails[field].trim().length == 0;
      if (isError) {
        formErrors[field] = true;
      }
    });

    return formErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = formValidation();
    // console.log(validationError);
    setError(validationError);

    try {
      if (!Object.values(validationError).some((a) => a)) {
        const response = await axios.post(
          `${apiUrl}/letterbooks/users/register`,
          {
            email: event.target.email.value,
            password: event.target.password.value,
            confirm_password: event.target.confirm_password.value,
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            age: event.target.age.value,
            phone: event.target.phone.value,
            fav_book: event.target.fav_book.value,
            address: event.target.address.value,
          }
        );

        const tokenlogin = response.data.token;

        localStorage.setItem("tokenlogin", tokenlogin);

        setFormSubmitted(true);
        navigate("/homepage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="signup">
      <h1 className="signup__title">Sign up</h1>
      <form className="signup__form" onSubmit={handleSubmit}>
        <div className="signup__form-half-container">
          <div className="signup__form-half">
            <Input
              type="text"
              name="first_name"
              label="First name"
              value={formDetails.first_name}
              onChange={handleChange}
            />

            <Input
              type="text"
              name="last_name"
              label="Last name"
              value={formDetails.last_name}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="phone"
              label="Phone"
              value={formDetails.phone}
              onChange={handleChange}
            />
            <Input
              type="number"
              name="age"
              label="Age"
              value={formDetails.age}
              onChange={handleChange}
            />
          </div>
          <div className="signup__form-half">
            <Input
              type="text"
              name="address"
              label="Address"
              value={formDetails.address}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="fav_book"
              label="Favourite book"
              value={formDetails.fav_book}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="email"
              label="Email"
              value={formDetails.email}
              onChange={handleChange}
            />

            <Input
              type="password"
              name="password"
              label="Password"
              value={formDetails.password}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="confirm_password"
              label="Confirm Password"
              value={formDetails.confirm_password}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="signup__button">
          Sign up
          {!formDetails && (
            <div className="signup__error">
              <p>you must fill out all of the fields</p>
            </div>
          )}
        </button>

        {Object.values(error).some((error) => error) && (
          <FormError error={error} />
        )}
      </form>

      <p className="signup__no">
        <NavLink to="/login" className="signup__no-link">
          Already have an account? Log in
        </NavLink>
      </p>
    </main>
  );
}

export default Signup;
