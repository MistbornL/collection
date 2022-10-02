import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Account } from "./pages/Account";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";

function App() {
  const email = localStorage.getItem("email");
  return (
    <Routes>
      {email ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<Login />} />
      )}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;
