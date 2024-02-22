import "./Login.scss";
import Input from "../../components/Input/Input";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

function Login() {
  const [error, setError] = useState("");

  const [formDetails, setFormDetails] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

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
    });

    if (!formDetails["email"]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email required to log in",
      }));
      isValid = false;
    }

    if (!formDetails["password"]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password required to log in",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formValidation()) return;

    try {
      const response = await axios.post(`${apiUrl}/letterbooks/users/login`, {
        email: event.target.email.value,
        password: event.target.password.value,
      });

      const tokenlogin = response.data.token;

      localStorage.setItem("tokenlogin", tokenlogin);

      navigate("/homepage");
    } catch (error) {
      if (error.response.status === 401) {
        setError("Invalid login, please try again.");
      }
    }
  };
  return (
    <main className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>
        <Input
          type="text"
          name="email"
          label="Email"
          error={formErrors.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          error={formErrors.password}
          onChange={handleChange}
        />
        <button className="login__field login__button">Log in</button>
        {error && <div className="login__error">{error} </div>}
      </form>
      <p className=" login__no">
        <NavLink to="/signup" className=" login__no-link">
          Need an account? Sign up
        </NavLink>
      </p>
    </main>
  );
}

export default Login;
