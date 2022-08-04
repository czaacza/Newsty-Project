import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  articles: [],
  chosenArticle: {},
};

export const loadArticles = async function () {
  try {
    // Creating articles array containing ID
    const data = await getJSON(API_URL);
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
    console.error(`${err} !!!!`);
    throw err;
  }
};

export const loadChosenArticle = function (id) {
  for (let art of state.articles) {
    if (art.id == id) {
      state.chosenArticle = art;
      console.log('id found');
      return;
    }
  }
  throw new Error(
    'We could not find that article. Please try with another one.'
  );
};
