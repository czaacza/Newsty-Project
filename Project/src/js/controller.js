const articleContainer = document.querySelector('.article');
const resultsUl = document.querySelector('.results');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showArticle = async function () {
  try {
    // Loading article
    const response = await fetch(
      'https://newsapi.org/v2/everything?q=Samsung&language=en&from=2022-07-27&sortBy=popularity&apiKey=dc297ae8299e47b7b6f153d8f0dd2d73'
    );
    const data = await response.json();
    const articles = data.articles;
    const article = articles[0];
    const p = document.createElement('p');
    console.log(articles);
    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }
    // Rendering the pagination
    for (let i = 0; i < 10; i++) {
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
    const markup = ``;
  } catch (err) {
    alert(err);
  }
};
showArticle();
