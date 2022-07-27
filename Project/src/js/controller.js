const recipeContainer = document.querySelector('.recipe');

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
    const response = await fetch(
      'https://newsapi.org/v2/everything?q=Samsung&language=en&from=2022-07-27&sortBy=popularity&apiKey=dc297ae8299e47b7b6f153d8f0dd2d73'
    );
    const data = await response.json();
    const articles = data.articles;
    console.log(articles);
    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }
  } catch (err) {
    alert(err);
  }
};
showArticle();
