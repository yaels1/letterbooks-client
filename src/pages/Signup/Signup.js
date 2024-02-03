import "./Signup.scss";
import Input from "../../components/Input/Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
    if (!formDetails["email"].includes("@")) {
      formErrors["email"] = true;
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
    console.log(validationError);
    setError(validationError);

    try {
      if (!Object.values(validationError).some((a) => a)) {
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
        setFormSubmitted(true);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
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
          value={formDetails.first_name}
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

        {Object.values(error).some((error) => error) && (
          <FormError error={error} />
        )}
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
