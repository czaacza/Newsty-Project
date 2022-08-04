import * as model from './model.js';
import articleView from './views/articleView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
const resultsUl = document.querySelector('.results');

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
      console.log('welcome msg rendered');
      articleView.renderWelcomeMessage();
    } else {
      // Get the article with selected ID
      model.loadChosenArticle(chosenArticleID);
      console.log('article loaded');

      // Rendering the article
      articleView.render(model.state.chosenArticle);
    }
  } catch (err) {
    articleView.renderError(`${err}`);
  }
};

const init = async function () {
  try {
    await model.loadArticles();
    controlArticle();
    articleView.addHandlerRender(controlArticle);
  } catch (err) {
    console.log(err);
  }
};
init();
