import * as model from './model.js';
import articleView from './views/articleView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash >= 0 ? hash : -hash;
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlArticle = function () {
  try {
    const chosenArticleID = window.location.hash.slice(1);

    if (chosenArticleID === '') {
      articleView._renderWelcomeMessage();
    } else {
      // Get the article with selected ID
      model.loadChosenArticle(chosenArticleID);

      // Rendering the article
      articleView._render(model.state.chosenArticle);
    }
  } catch (err) {
    articleView._renderError(`${err}`);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    model.state.search.currentPage = 1;

    resultsView._renderSpinner();
    await model.loadArticles(query);

    resultsView._render(model.getSearchResultsPage());

    paginationView._render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPrevButton = function () {
  model.state.search.currentPage--;
  resultsView._render(model.getSearchResultsPage());
  paginationView._render(model.state.search);
};

const controlNextButton = function () {
  model.state.search.currentPage++;
  resultsView._render(model.getSearchResultsPage());
  paginationView._render(model.state.search);
};

// const controlAddBookmark = function () {
//   model.addBookmark(model.state.chosenArticle);
//   console.log('bookmark added');
// };

// const controlRemoveBookmark = function () {
//   model.removeBookmark(model.state.chosenArticle);
//   console.log('bookmark removed');
// };

controlBookmark = function () {
  let isBookmarked;
  if (!model.state.chosenArticle.bookmarked) {
    model.addBookmark(model.state.chosenArticle);
    isBookmarked = true;
  } else {
    model.removeBookmark(model.state.chosenArticle);
    isBookmarked = false;
  }
  articleView._renderBookmarkIcon(isBookmarked);
};

const init = async function () {
  try {
    articleView.addHandlerRender(controlArticle);
    articleView.addHandlerAddBookmark(controlBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerButtons(controlPrevButton, controlNextButton);
  } catch (err) {
    console.log(err);
  }
};

init();
