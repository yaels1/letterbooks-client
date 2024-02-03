import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";

import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import SingleBook from "./components/SingleBook/SingleBook";
import Book from "./pages/Book/Book";
import Questionnaire from "./pages/Questionnaire/Questionnaire";

import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Lists from "./pages/Lists/Lists";
import ListRecommendation from "./components/ListRecommendation/ListRecommendation";
import ListRead from "./components/ListRead/ListRead";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/list/book" element={<Book />} />
        <Route path="/book/:id" element={<SingleBook />} />
        <Route path="/list" element={<Lists />} />

        <Route path="/list/read" element={<ListRead />} />

        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/list/recommendations" element={<ListRecommendation />} />
        <Route path="/*" element={<div>page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
