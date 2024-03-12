import { useState } from "react";

import "./Search.scss";

import SearchResults from "../../components/SearchResults/SearchResults";

const Search = () => {
  const [searchTermTitle, setSearchTermTitle] = useState("");
  const [searchTermAuthor, setSearchTermAuthor] = useState("");
  const [searchTermTheme, setSearchTermTheme] = useState("");
  const [submitSearch, setsubmitSearch] = useState(false);
  const [submittedTerms, setSubmittedTerms] = useState({
    title: "",
    author: "",
    theme: ",,",
  });

  const isFormValid = () => {
    if (!searchTermTitle && !searchTermAuthor && !searchTermTheme) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      setsubmitSearch(true);
    }
    setSubmittedTerms({
      title: searchTermTitle,
      author: searchTermAuthor,
      theme: searchTermTheme,
    });
  };

  return (
    <div className="search">
      <h1 className="search__title">Find a book</h1>
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__form-box">
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
                onChange={(event) =>
                  setSearchTermTitle(event.target.value.toLowerCase())
                }
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
                onChange={(event) =>
                  setSearchTermAuthor(event.target.value.toLowerCase())
                }
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
                onChange={(event) =>
                  setSearchTermTheme(event.target.value.toLowerCase())
                }
              />
            </label>
          </div>
        </div>
        <button>lets find some books!</button>
      </form>
      <div className="search__results">
        {submittedTerms.title && submitSearch && (
          <>
            <div className="search__results-container">
              <p>title</p>
              <SearchResults searchTerm={searchTermTitle} />
            </div>
          </>
        )}
        {submittedTerms.author && submitSearch && (
          <>
            <div className="search__results-container">
              <p>author</p>
              <SearchResults searchTerm={searchTermAuthor} />
            </div>
          </>
        )}
        {submittedTerms.theme && submitSearch && (
          <>
            <div className="search__results-container">
              <p>theme</p>
              <SearchResults searchTerm={searchTermTheme} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Search;
