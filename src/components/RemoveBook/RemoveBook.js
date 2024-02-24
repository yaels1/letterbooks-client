import "./RemoveBook.scss";

const DeleteBook = () => {
  return (
    <section className="remove">
      <div className="remove__container">
        <h1 className="remove__title">Remove this book from this list</h1>
        <button>cancel</button>
        <button>delete book</button>
      </div>
    </section>
  );
};
