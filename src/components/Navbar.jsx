import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search/${query}`);
    setQuery("");
  };

  return (
    <nav className="bg-slate-950 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <h1
        className="text-xl font-bold text-red-500 cursor-pointer"
        onClick={() => navigate("/")}
      >
        🎬 MovieApp
      </h1>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-1 rounded bg-slate-800 text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
        >
          Search
        </button>

        <button
            onClick={() => navigate("/popular")}
            className="text-sm text-gray-300 hover:text-white"
            >
            Popular
            </button>

        <button
        onClick={() => navigate("/favorites")}
        className="text-sm text-gray-300 hover:text-white"
        >
        ❤️ Favorites
        </button>    

      </form>
    </nav>
  );
}
