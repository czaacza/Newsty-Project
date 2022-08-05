import * as model from './model.js';
import articleView from './views/articleView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

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
      articleView.renderWelcomeMessage();
    } else {
      // Get the article with selected ID
      model.loadChosenArticle(chosenArticleID);

      // Rendering the article
      articleView.render(model.state.chosenArticle);
    }
  } catch (err) {
    articleView.renderError(`${err}`);
  }
};

const init = async function () {
  try {
    articleView.addHandlerRender(controlArticle);
    searchView.addHandlerSearch(controlSearchResults);
  } catch (err) {
    console.log(err);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();

    resultsView.renderSpinner();
    await model.loadArticles(query);
    resultsView.renderResults(model.state.articles);
  } catch (err) {
    console.log(err);
  }
};

init();
