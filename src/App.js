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
import { SearchResult } from "./pages/SearchResult";
import { AdminPage } from "./pages/AdminPage";
import { Suspense, useEffect } from "react";
import { AllCollections } from "./pages/AllCollections";

function App() {
  useEffect(() => {
    localStorage.setItem("theme", "light");
  }, []);
  return (
    <Suspense fallback="loading">
      <Routes>
        <Route path="/" element={<AllItems />} />
        <Route path="/collections" element={<AllCollections />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/items" element={<AllItems />} />
        <Route path="/collection/:email" element={<Collection />} />
        <Route path="/account" element={<Account />} />
        <Route
          path="/collection/create/:email"
          element={<CreateCollection />}
        />
        <Route path="/collection/update/:id" element={<EditCollection />} />
        <Route
          path="/collection/item/create/:id/:email"
          element={<CreateItem />}
        />
        <Route path="/collection/item/create/:id/" element={<CreateItem />} />
        <Route path="/collection/items/:id/:email" element={<Items />} />
        <Route path="/collection/item/edit/:id" element={<EditItem />} />
        <Route path="/search/:tag" element={<SearchResult />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
