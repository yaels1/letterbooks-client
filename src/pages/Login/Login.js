import "./Login.scss";
import Input from "../../components/Input/Input";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT;

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/letterbooks/users/login`, {
        email: event.target.email.value,
        password: event.target.password.value,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/homepage");
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <main className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>
        <Input type="text" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />
        <button className="login__field login__button">Log in</button>
        {error && (
          <div className="login__error">{error.message} please try again</div>
        )}
      </form>
      <p className=" login__no">
        Need an account?{" "}
        <Link to="/signup" className=" login__no-link">
          Sign up
        </Link>
      </p>
    </main>
  );
}

export default Login;
