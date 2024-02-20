import "./BookContainer.scss";

const BookContainer = ({ image, title, name, pages, themes }) => {
  return (
    <>
      <img src={image} className="allbooks__image" />
      <div className="allbooks__info">
        <p className="allbooks__text allbooks__title">Title: {title}</p>
        <p className="allbooks__text allbooks__author">Author: {name}</p>
        <p className="allbooks__text allbooks__pages">No. of Pages: {pages}</p>
        <p className="allbooks__text allbooks__themes">
          Themes: {themes.join(", ")}
        </p>
      </div>
    </>
  );
};

export default BookContainer;
