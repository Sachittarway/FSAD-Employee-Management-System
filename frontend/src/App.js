import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import EmployeeList from "./Pages/EmployeeList";
import MyDetails from "./Pages/MyDetails";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManagerDashboard from "./Pages/Manager/ManagerDashboard";
import ResourceRequests from "./Pages/ResourceRequests";
import { AuthProvider } from "./Auth/AuthContext";
import ProtectedRoute from "./Auth/ProtectedRoute";
import TeamList from "./Pages/TeamList";


function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
             path="/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/EmployeeList" element={<EmployeeList />}/>
                    <Route path="/TeamList" element={<TeamList />} />
                    <Route path="/MyDetails" element={<MyDetails />} />
                    <Route path="/Resources" element={<ResourceRequests />} />

                    <Route path="/AdminDashboard" element={<AdminDashboard />} />

                    <Route path="/ManagerDashboard" element={<ManagerDashboard />} />
                  </Routes>
                </ProtectedRoute>
              }
              />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
