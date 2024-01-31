import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";

import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import SingleBook from "./pages/Book/Book";
import Questionnaire from "./pages/Questionnaire/Questionnaire";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

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
        <Route path="/book/:id" element={<SingleBook />} />

        {/* <Route path="/list" element={<List />} />
        <Route path="/list/read" element={<ReadList />} />
        <Route path="/list/recommendations" element={<RecommendationsList />} /> */}

        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/*" element={<div>page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//  /  /homepage  homepage
//  /profile  profile
//  /list   /list/read   /list/recommendations
//  /book/:id
//  /questionnaire
//    /not found
