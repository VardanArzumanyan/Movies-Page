setInterval(function () {
  const time = document.getElementById("time");
  time.innerHTML = new Date().toLocaleString();
}, 1000);

async function fetchAsync() {
  try {
    let response = await fetch(
      "https://gist.githubusercontent.com/Urdzik/de477f8e3d7baf4366c9d797cfe63531/raw/38c6afa2937ef222323392cc34c8c8c77e02fc40/Movie.json"
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function createMovieBlock(movie) {
  const movieContainer = document.getElementById("middle-content");

  const movieBlock = document.createElement("div");
  movieBlock.classList.add("movie-block");

  const image = document.createElement("img");
  image.className = "movie-block-image";
  image.src = movie.Poster;
  image.alt = movie.name;

  const name = document.createElement("h2");
  name.classList.add("movie-block-title");
  name.textContent = movie.Title;

  let button = document.createElement("button");
  button.classList.add("more-button");
  button.innerHTML = "More";

  let more = document.createElement("div");
  more.classList.add("more-block");

  let moreContent = document.createElement("div");
  moreContent.classList.add("more-content");

  let moreTitle = document.createElement("h2");
  moreTitle.classList.add("more-content-title");
  moreTitle.innerHTML = movie.Title;

  let moreImg = document.createElement("img");
  moreImg.classList.add("more-content-img");
  moreImg.src = movie.Poster;

  let moreContentText_texts = document.createElement("div");
  moreContentText_texts.classList.add("moreContentText-texts");

  let moreContentText1 = document.createElement("p");
  moreContentText1.innerHTML = "Ganre: " + movie.Genre;
  let moreContentText2 = document.createElement("p");
  moreContentText2.innerHTML = "Plot:  " + movie.Plot;
  let moreContentText3 = document.createElement("p");
  moreContentText3.innerHTML = "Awards: " + movie.Awards;
  let released = document.createElement("p");
  released.innerHTML = "Released date: " + movie.Released;

  moreContentText_texts.append(
    moreContentText1,
    moreContentText2,
    moreContentText3,
    released
  );

  moreContent.append(moreTitle, moreImg, moreContentText_texts);
  more.appendChild(button);
  more.appendChild(moreContent);

  movieBlock.appendChild(name);
  movieBlock.appendChild(image);
  movieBlock.appendChild(more);
  movieContainer.appendChild(movieBlock);
}

setTimeout(async () => {
  try {
    const data = await fetchAsync();
    data
      .filter((movie) => movie.Title !== "Little Women")
      .forEach((movie) => {
        createMovieBlock(movie);
      });
  } catch (error) {
    console.error("Error processing data:", error);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("lightdark");
  const body = document.body;

  button.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
  });
});

let modeToggle = false;

function toggleMode() {
  const button = document.getElementById("lightdark");
  modeToggle = !modeToggle;
  if (modeToggle) {
    button.classList.add("dark-mode");
    button.style.backgroundImage = "url('sun.png')";
  } else {
    button.classList.remove("dark-mode");
    button.classList.add("black-mode");
    button.style.backgroundImage = "url('moon.png')";
  }
}
