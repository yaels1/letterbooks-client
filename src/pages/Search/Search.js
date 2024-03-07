import { useState } from "react";

import "./Search.scss";

import SearchResults from "../../components/SearchResults/SearchResults";

const Search = () => {
  const [searchTermTitle, setSearchTermTitle] = useState("");
  const [searchTermAuthor, setSearchTermAuthor] = useState("");
  const [searchTermTheme, setSearchTermTheme] = useState("");

  const handleTitleChange = (event) => {
    setSearchTermTitle(event.target.value.toLowerCase());
  };

  const handleAuthorChange = (event) => {
    setSearchTermAuthor(event.target.value.toLowerCase());
  };

  const handleThemeChange = (event) => {
    setSearchTermTheme(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="search">
      <h1 className="search__title">Find a book</h1>
      <form className="search__form" onSubmit={handleSubmit}>
        {/* title */}
        <div className="search__form-container">
          <label htmlFor="title" className="search__form-label">
            Title{" "}
            <input
              className="search__form-input"
              type="text"
              name="title"
              value={searchTermTitle}
              placeholder="Search for a title"
              onChange={handleTitleChange}
            />
          </label>
        </div>
        {/* author */}
        <div className="search__form-container">
          <label htmlFor="author" className="search__form-label">
            Author{" "}
            <input
              className="search__form-input"
              type="text"
              name="author"
              value={searchTermAuthor}
              placeholder="Search for an author"
              onChange={handleAuthorChange}
            />
          </label>
        </div>
        {/* theme */}
        <div className="search__form-container">
          <label htmlFor="theme" className="search__form-label">
            Theme{" "}
            <input
              className="search__form-input"
              type="text"
              name="theme"
              value={searchTermTheme}
              placeholder="Search for a theme"
              onChange={handleThemeChange}
            />
          </label>
        </div>
        {/* <button>lets find some books!</button> */}
      </form>
      <div className="search__results">
        <div className="search__results-container">
          <SearchResults searchTerm={searchTermTitle} />
        </div>
        <div className="search__results-container">
          <SearchResults searchTerm={searchTermAuthor} />
        </div>
        <div className="search__results-container">
          <SearchResults searchTerm={searchTermTheme} />
        </div>
      </div>
    </div>
  );
};
export default Search;
