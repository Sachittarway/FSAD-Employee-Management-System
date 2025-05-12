import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SideNavbar from "./Components/SideNavbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/nav" element={<SideNavbar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
