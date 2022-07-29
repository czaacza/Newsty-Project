const articleContainer = document.querySelector(".article");
const resultsUl = document.querySelector(".results");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const showArticle = async function() {
    try {
        // Loading article
        const response = await fetch("https://newsapi.org/v2/everything?q=Samsung&language=en&from=2022-07-27&sortBy=popularity&apiKey=dc297ae8299e47b7b6f153d8f0dd2d73");
        const data = await response.json();
        const articles = data.articles;
        const article = articles[0];
        const p = document.createElement("p");
        console.log(articles);
        if (!response.ok) throw new Error(`${data.message} (${response.status})`);
        // Rendering the pagination
        for(let i = 0; i < 10; i++){
            let newHtml = `<li class="preview">
      <a class="preview__link preview__link--active" href="#23456">
      <figure class="preview__fig">
      <img src="${articles[i].urlToImage}" alt="Test" />
      </figure>
      <div class="preview__data">
      <h4 class="preview__title">${articles[i].title}</h4>
      <p class="preview__publisher">${articles[i].source.name}</p>
      <div class="preview__user-generated">
      <svg>
      <use href="src/img/icons.svg#icon-user"></use>
      </svg>
      </div>
      </div>
      </a>
      </li>`;
            resultsUl.innerHTML = resultsUl.innerHTML.concat(newHtml);
        }
        // Rendering the article
        const markup = `<figure class="article__fig">
          <img
            src="${article.urlToImage}"
            alt="Tomato"
            class="article__img"
          />
        </figure>
        <div class="article__title">
          <p>
            ${article.title}
          </p>
        </div>

        <div class="article__details">
          <div class="article__info">
            <svg class="article__info-icon">
              <use href="src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="article__info-text">${article.publishedAt.split("T")[0]}</span>
          </div>
          <div class="article__info">
            <svg class="article__info-icon">
              <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="article__info-bold article__info-bold--people"
              >Author:</span
            >
            <span class="article__info-text">${article.author}, ${article.source.name}</span>
          </div>

          <div class="article__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="src/img/icons.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="article__heading">
          <h2 class="heading--2">article</h2>
        </div>
        <div class="article__text">
          <div class="article__description">
            <p>
              ${article.description}
            </p>
          </div>
          <div class="article__content">
            <p>
              ${article.content}
            </p>
          </div>
        </div>

        <div class="article__directions">
          <h2 class="heading--2">Read more</h2>
          <p class="article__directions-text">
            This small excerpt from the article was brought up by
            <span class="article__publisher">Google News API</span>.
          </p>
          <p class="article__direction-text-ending">
            Check the whole article here!
          </p>
          <a
            class="btn--small article__btn"
            href="${article.url}"
            target="_blank"
          >
            <span>Article</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
      </div>
    </div>`;
        articleContainer.innerHTML = "";
        articleContainer.insertAdjacentHTML("afterbegin", markup);
    } catch (err) {
        alert(err);
    }
};
showArticle();

//# sourceMappingURL=index.62406edb.js.map
