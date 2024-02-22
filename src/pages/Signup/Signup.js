import "./Signup.scss";
import Input from "../../components/Input/Input";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import FormError from "../../components/FormError/FormError";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

function Signup() {
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

  const [formErrors, setFormErrors] = useState({
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

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormDetails({
      ...formDetails,
      [event.target.name]: event.target.value,
    });
  };

  const formValidation = () => {
    let isValid = true;

    Object.keys(formDetails).forEach((field) => {
      const isError = formDetails[field].trim().length === 0;
      if (isError) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "This field is required",
        }));
      }
      if (!isError) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "",
        }));
      }
    });

    // email @
    if (!formDetails["email"].includes("@")) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email must include an @",
      }));
      isValid = false;
    }

    // password one capital letter
    if (!formDetails["password"].match(/[A-Z]/)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must include a capital letter",
      }));
      isValid = false;
    }

    // password one special character
    if (!formDetails["password"].match(/[^a-zA-Z0-9_]/)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must include a special character",
      }));
      isValid = false;
    }

    // password one number
    if (!formDetails["password"].match(/[0-9]/)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must include a number",
      }));
      isValid = false;
    }

    // password min 5 characters
    if (formDetails["password"].length <= 5) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be longer than 5 characters",
      }));
      isValid = false;
    }

    // phone is 11 digits
    if (formDetails["phone"].length !== 11) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone number must be 11 digits",
      }));
      isValid = false;
    }

    // age is above 5 but below 120
    if (Number(formDetails["age"]) > 120 || Number(formDetails["age"]) < 5) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        age: "Age must be between 5 and 120 years old",
      }));
      isValid = false;
    }

    if (formDetails["confirm_password"] !== formDetails["password"]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirm_password: "Passwords must be the same",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formValidation()) return;

    try {
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

      navigate("/homepage");
    } catch (error) {
      console.error(error);
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
              error={formErrors.first_name}
              onChange={handleChange}
            />

            <Input
              type="text"
              name="last_name"
              label="Last name"
              value={formDetails.last_name}
              error={formErrors.last_name}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="phone"
              label="Phone"
              value={formDetails.phone}
              error={formErrors.phone}
              onChange={handleChange}
            />
            <Input
              type="number"
              name="age"
              label="Age"
              value={formDetails.age}
              error={formErrors.age}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="address"
              label="Address"
              value={formDetails.address}
              error={formErrors.address}
              onChange={handleChange}
            />
          </div>
          <div className="signup__form-half">
            <Input
              type="text"
              name="fav_book"
              label="Favourite book"
              value={formDetails.fav_book}
              error={formErrors.fav_book}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="email"
              label="Email"
              value={formDetails.email}
              error={formErrors.email}
              onChange={handleChange}
            />

            <Input
              type="password"
              name="password"
              label="Password"
              value={formDetails.password}
              error={formErrors.password}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="confirm_password"
              label="Confirm Password"
              value={formDetails.confirm_password}
              error={formErrors.confirm_password}
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

        {Object.values(formErrors).some((formErrors) => formErrors) && (
          <FormError />
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
