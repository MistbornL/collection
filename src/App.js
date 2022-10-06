import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Account } from "./pages/Account";
import { AllItems } from "./pages/AllItems";
import { Items } from "./pages/Items";
import { CreateCollection } from "./pages/CreateCollection";
import { CreateItem } from "./pages/CreateItem";
import { EditItem } from "./pages/EditItem";

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
      <Route path="/collections" element={<AllItems />} />
      <Route path="/account" element={<Account />} />
      <Route path="/collection/create" element={<CreateCollection />} />
      <Route path="/collection/item/create/:id" element={<CreateItem />} />
      <Route path="/collection/items/:id" element={<Items />} />
      <Route path="/collection/item/edit/:id" element={<EditItem />} />
    </Routes>
  );
}

export default App;
