
const API_KEY = "62b7fa6831aa46f49733010a20870fcf"; 

const startBtn = document.getElementById("start-btn");
const searchSection = document.getElementById("search-section");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const newsContainer = document.getElementById("news-container");
const loading = document.getElementById("loading");


startBtn.addEventListener("click", () => {
  startBtn.style.display = "none"; // hide button
  document.getElementById("media").style.display = "none"; 
  document.querySelector(".phrase").style.display = "none"; 

  searchSection.classList.remove("hidden"); // show search
});


async function fetchNews(query) {
  try {
    loading.classList.remove("hidden");
    newsContainer.innerHTML = "";

    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
    
    const res = await fetch(url);
    const data = await res.json();

    displayNews(data.articles, query);

  } catch (error) {
    newsContainer.innerHTML = "<p>Something went wrong.</p>";
  } finally {
    loading.classList.add("hidden");
  }
}


function displayNews(articles, query) {
  newsContainer.innerHTML = "";


  const filtered = articles.filter(article =>
    article.title &&
    article.description &&
    article.source.name &&
    (
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.source.name.toLowerCase().includes(query.toLowerCase())
    )
  );

  if (filtered.length === 0) {
    newsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  filtered.forEach(article => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <small><strong>Source:</strong> ${article.source.name}</small>
      <p class="credibility">⚠️ Verify from trusted sources</p>
    `;

    newsContainer.appendChild(card);
  });
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (query === "") {
    alert("Please enter something!");
    return;
  }

  fetchNews(query);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});