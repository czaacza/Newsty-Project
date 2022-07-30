import * as model from './model.js';
import articleView from './views/articleView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
const resultsUl = document.querySelector('.results');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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

const controlArticles = async function () {
  try {
    articleView.renderSpinner();
    // Loading articles
    await model.loadArticles();
    const chosenArticleID = window.location.hash.slice(1);

    // Get the article with selected ID
    model.loadChosenArticle(chosenArticleID);

    // Rendering the article
    articleView.render(model.state.chosenArticle);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(e =>
  window.addEventListener(e, controlArticles)
);
