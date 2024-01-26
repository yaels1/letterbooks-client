import "./Homepage.scss";
import { Link } from "react-router-dom";
import cosyPhoto from "../../assets/images/cosy-photo.jpg";

const HomePage = () => {
  return (
    <main>
      <div className="homepage">
        <h1 className="homepage__title">this is the homepage, welcome</h1>
        <div className="homepage__intro">
          <div className="homepage__text">
            <p>this is some info about this app</p>
            <p>lorem ipsum blahblahblah</p>
            <p>we love a good book recommendation wow</p>
            <p>there such an easy questionnaire to take</p>
          </div>
          <img
            src={cosyPhoto}
            className="homepage__img"
            alt="book stack logo"
          />
        </div>
        <div className="homepage__nav">
          <Link to="/profile" className="homepage__nav-link">
            <p>profile</p>
          </Link>
          <Link to="/questionnaire" className="homepage__nav-link">
            <p>questionnaire</p>
          </Link>
        </div>
      </div>
    </main>
  );
};
export default HomePage;
