import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import Navbar from "./components/Navbar";
import Popular from "./pages/Popular";
import Favorites from "./pages/Favorites";


// inside <Routes>
<Route path="/popular" element={<Popular />} />


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
