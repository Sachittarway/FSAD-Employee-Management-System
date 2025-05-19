import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SideNavbar from "./Components/SideNavbar";
import EmployeeList from "./Pages/EmployeeList";
import Dashboard from "./Pages/Dashboard";
import MyDetails from "./Pages/MyDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/nav" element={<SideNavbar />} />
          <Route path="/EmployeeList" element={<EmployeeList />}/>
          <Route path="/Dashboard" element={<Dashboard />}/>
          <Route path="/MyDetails" element={<MyDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
