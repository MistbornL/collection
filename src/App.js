import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Account } from "./pages/Account";
import { Collection } from "./pages/collection";
import { CreateCollection } from "./pages/CreateCollection";
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
      <Route path="/collection/create" element={<CreateCollection />} />
      <Route path="/collection/:id" element={<Collection />} />
    </Routes>
  );
}

export default App;
