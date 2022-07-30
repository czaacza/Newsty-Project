import { async } from 'regenerator-runtime';

export const state = {
  articles: [],
  chosenArticle: {},
};

export const loadArticles = async function () {
  try {
    const response = await fetch(
      'https://newsapi.org/v2/everything?q=Samsung&language=en&from=2022-07-27&sortBy=popularity&apiKey=dc297ae8299e47b7b6f153d8f0dd2d73'
    );
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);

    // Creating articles array containing ID

    for (let i = 0; i < data.articles.length; i++) {
      const art = {
        author: data.articles[i].author,
        content: data.articles[i].content,
        description: data.articles[i].description,
        publishedAt: data.articles[i].publishedAt,
        source: data.articles[i].source,
        title: data.articles[i].title,
        url: data.articles[i].url,
        urlToImage: data.articles[i].urlToImage,
        id: data.articles[i].content.hashCode(),
      };
      state.articles.push(art);
    }
    console.log(state.articles);
  } catch (err) {
    alert(err);
  }
};

export const loadChosenArticle = function (id) {
  for (let art of state.articles) {
    if (art.id == id) {
      state.chosenArticle = art;
      return;
    }
  }
};
