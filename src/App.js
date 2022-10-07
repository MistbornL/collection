import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Account } from "./pages/Account";
import { AllItems } from "./pages/AllItems";
import { Items } from "./pages/Items";
import { CreateCollection } from "./pages/CreateCollection";
import { CreateItem } from "./pages/CreateItem";
import { EditItem } from "./pages/EditItem";

import { Collection } from "./pages/Collection";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { EditCollection } from "./pages/EditColleciton";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AllItems />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/items" element={<AllItems />} />
      <Route path="/collection/:email" element={<Collection />} />
      <Route path="/account" element={<Account />} />
      <Route path="/collection/create" element={<CreateCollection />} />
      <Route path="/collection/create/:email" element={<CreateCollection />} />
      <Route path="/collection/update/:id" element={<EditCollection />} />
      <Route path="/collection/item/create/:id" element={<CreateItem />} />
      <Route path="/collection/items/:id" element={<Items />} />
      <Route path="/collection/item/edit/:id" element={<EditItem />} />
    </Routes>
  );
}

export default App;
