const API_KEY = "19ad8a5e6877994a1672e668fd79cbb8";
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

let category = "All";
let movies = [];

async function getMovies() {
  const box = document.getElementById("movies");
  box.innerHTML = "<p>Loading movies...</p>";

  try {
    let url = `${API_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`;

    if (category !== "All") {
      const genres = {
        Action: 28,
        Comedy: 35,
        Horror: 27,
        Romance: 10749
      };

      url = `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genres[category]}&language=hi-IN&sort_by=popularity.desc`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    movies = data.results || [];
    renderMovies();

  } catch (error) {
    box.innerHTML = "<p>Movies load nahi ho sakin. API Key check karo.</p>";
  }
}

function renderMovies() {
  const q = document.getElementById("search").value.toLowerCase();

  const filtered = movies.filter(m =>
    (m.title || "").toLowerCase().includes(q)
  );

  document.getElementById("movies").innerHTML =
    filtered.map(m => `
      <div class="movie">
        <img src="${m.poster_path ? IMAGE_URL + m.poster_path : ""}"
             alt="${m.title || "Movie"}">
        <p><b>${m.title || "Unknown"}</b></p>
        <p>⭐ ${Number(m.vote_average || 0).toFixed(1)} / 10</p>
        <p>${m.release_date || "Release date unavailable"}</p>
      </div>
    `).join("") || "<p>No movies found</p>";
}

function filterCat(c, b) {
  category = c;

  document.querySelectorAll(".categories button")
    .forEach(x => x.classList.remove("active"));

  b.classList.add("active");
  getMovies();
}

function filterMovies() {
  renderMovies();
}

getMovies();
