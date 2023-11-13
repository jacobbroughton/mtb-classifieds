import { Route, Routes } from "react-router-dom";
import "./App.css";
import Listings from "./components/pages/Listings/Listings";
import Navbar from "./components/ui/Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route element={<Listings />} path="/" />
        </Routes>
      </main>
    </div>
  );
}

export default App;
