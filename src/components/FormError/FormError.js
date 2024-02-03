import "./FormError.scss";
import errorImg from "../../assets/logo/error.png";

const FormError = () => {
  return (
    <div className="error">
      <img
        className="error__image"
        src={errorImg}
        alt="This input has an error"
      />
      <p className="error__message">please fill out all of the form fields!</p>

      <img
        className="error__image"
        src={errorImg}
        alt="This input has an error"
      />
    </div>
  );
};

export default FormError;