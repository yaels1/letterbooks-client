import "./EmptyList.scss";

import { NavLink } from "react-router-dom";
import sadFace from "../../assets/logo/sad-face.png";

const EmptyList = () => {
  return (
    <div className="empty-list">
      <p className="empty-list__text">
        No books have been added to this list yet{" "}
        <img src={sadFace} className="empty-list__img" />, have a look through
        the list of all books, or fill out our recommendations questionnaire to
        add some!
      </p>
      <div className="empty-list__link-container">
        <NavLink to="/list/book" className="empty-list__link">
          <p className="empty-list__link-text">List of all books</p>
        </NavLink>

        <NavLink to="/questionnaire" className="empty-list__link">
          <p className="empty-list__link-text">Questionnaire</p>
        </NavLink>
      </div>
    </div>
  );
};

export default EmptyList;
