import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SideNavbar from "./Components/SideNavbar";
import EmployeeList from "./Pages/EmployeeList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/nav" element={<SideNavbar />} />
          <Route path="/EmployeeList" element={<EmployeeList />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
