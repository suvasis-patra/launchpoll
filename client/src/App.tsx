import { Route, Routes } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Dashboard from "./features/dashboard/pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route index element={<h1>Welcome to launcPoll</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
