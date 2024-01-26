import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/list" element={<List />} />
        <Route path="/list/read" element={<ReadList />} />
        <Route path="/list/recommendations" element={<RecommendationsList />} />
        <Route path="/book/:id" element={<SingleBook />} />
        <Route path="/questionnaire" element={<Questionnaire />} />

        <Route path="/*" element={<div>page not found, or home page</div>} />
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
