import "./SignedOut.scss";

import { NavLink } from "react-router-dom";

import sadFace from "../../assets/logo/sad-face.svg";
import arrowRight from "../../assets/logo/arrow-right.png";
import arrowLeft from "../../assets/logo/arrow-left.png";

const SignedOut = () => {
  return (
    <main className="signed-out">
      <p className="signed-out-text">You must be logged in to see this page.</p>
      <img src={sadFace} className="signed-out-logo" />

      <div className="signed-out-login">
        <img src={arrowRight} className="signed-out-arrow" />
        <NavLink to="/login" className="signed-out-link">
          Log in
        </NavLink>
        <img src={arrowLeft} className="signed-out-arrow" />
      </div>
    </main>
  );
};

export default SignedOut;
