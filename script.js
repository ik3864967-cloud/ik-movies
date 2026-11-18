const API_KEY = "19ad8a5e6877994a1672e668fd79cbb8";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const API_URL = "https://api.themoviedb.org/3";

async function getMovies() {
  const response = await fetch(
    `${API_URL}/trending/movie/week?api_key=${API_KEY}`
  );

  const data = await response.json();
  console.log(data.results);
}

getMovies();