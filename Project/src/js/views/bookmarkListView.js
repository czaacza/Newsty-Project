import View from './View.js';
import icons from 'url:../../img/icons.svg';
import { loadArticles } from '../model.js';

class BookmarkListsView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  _displayData() {
    for (let result of this._data) {
      const markup = `<li class="preview">
                      <a class="preview__link" href="#${result.id}">
                        <figure class="preview__fig">
                          <img src="${result.urlToImage}" alt="Test" />
                        </figure>
                        <div class="preview__data preview__data__bookmark">
                          <h4 class="preview__title">
                            ${result.title}
                          </h4>
                          <p class="preview__publisher">${
                            result.author != null
                              ? result.author.slice(0, 40)
                              : ''
                          }</p>
                      </div>
                    </a>
                  </li>`;
      this._parentElement.insertAdjacentHTML('beforeend', markup);
    }
  }

  addHandlerRender(handler) {
    document.addEventListener('load', handler);
  }
}

export default new BookmarkListsView();
