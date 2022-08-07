import { async } from 'regenerator-runtime';
import { RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  chosenArticle: {},
  search: {
    articles: [],
    query: '',
    resultsPerPage: RESULTS_PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
};

export const loadArticles = async function (query) {
  try {
    clearArticles();
    state.search.query = query;
    // Creating articles array containing ID
    const data = await getJSON(query);
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
      state.search.articles.push(art);
    }
    console.log(state.search.articles);
  } catch (err) {
    console.error(`${err} !!!!`);
    throw err;
  }
};

const clearArticles = function () {
  state.search.articles = [];
};

export const loadChosenArticle = function (id) {
  for (let art of state.search.articles) {
    if (art.id == id) {
      state.chosenArticle = art;
      return;
    }
  }
  for (let bookmarkedArt of state.bookmarks) {
    if (bookmarkedArt.id == id) {
      state.chosenArticle = bookmarkedArt;
      return;
    }
  }
  throw new Error(
    'We could not find that article. Please try with another one.'
  );
};

export const getSearchResultsPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  let startIndex = state.search.resultsPerPage * (page - 1);
  let endIndex = startIndex + state.search.resultsPerPage;

  return state.search.articles.slice(startIndex, endIndex);
};

export const addBookmark = function (article) {
  state.bookmarks.push(article);

  if (article.id === state.chosenArticle.id) {
    state.chosenArticle.bookmarked = true;
  }
};

export const removeBookmark = function (article) {
  state.bookmarks = state.bookmarks.filter(element => {
    return element.id != article.id;
  });

  if (article.id === state.chosenArticle.id) {
    state.chosenArticle.bookmarked = false;
  }
};

export const checkIfArticleIsBookmarked = function () {
  for (let bookmarkedArt of state.bookmarks) {
    if (state.chosenArticle.id === bookmarkedArt.id) {
      state.chosenArticle.bookmarked = true;
    }
  }
};

export const setLocalStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const getLocalStorage = function () {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  if (Array.isArray(bookmarks) && bookmarks.length > 0) {
    state.bookmarks = bookmarks;
  }
};
