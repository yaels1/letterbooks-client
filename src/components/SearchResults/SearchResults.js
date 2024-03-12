import "./SearchResults.scss";
import useGetBooks from "../../hooks/useGetBooks";
import BookContainer from "../BookContainer/BookContainer";

const SearchResults = ({ searchTerm }) => {
  const { allBooks, isLoading, isError } = useGetBooks();

  const filterBooks = () => {
    if (!allBooks) return;

    const filteredBooks = allBooks.filter((book) => {
      const lowerCaseBookTitle = book.title.toLowerCase();
      const lowerCaseBookAuthor = book.name.toLowerCase();
      const bookThemesLower = book.themes.map((theme) => theme.toLowerCase());

      const titleMatch = searchTerm && lowerCaseBookTitle.includes(searchTerm);
      const authorMatch =
        searchTerm && lowerCaseBookAuthor.includes(searchTerm);
      const themeMatch =
        searchTerm &&
        bookThemesLower.some((theme) => theme.includes(searchTerm));

      return titleMatch || authorMatch || themeMatch;
    });
    return filteredBooks;
  };

  const filteredBooks = allBooks?.length > 0 ? filterBooks() : [];

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Something went wrong, please try again</h1>;

  console.log(searchTerm);
  console.log(filteredBooks);

  return (
    <div className="search-results">
      {/* Title Results */}
      {filteredBooks.length > 0 && <h2>Results for {searchTerm}:</h2>}
      <div className="search-results__container">
        {filteredBooks.map((book) => (
          <div key={book.id} className="search-results__book">
            <img className="search-results__image" src={book.image} />
          </div>
        ))}
      </div>

      {/* No results message */}
      {(!filteredBooks || filteredBooks.length === 0) && (
        <p>No results found for your search.</p>
      )}
    </div>
  );
};

export default SearchResults;
