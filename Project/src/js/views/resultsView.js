import View from './View.js';
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _paginationElement = document.querySelector('.pagination');

  _displayData() {
    for (let result of this._data) {
      const itemMarkup = `<li class="preview">
            <a class="preview__link preview__link--active" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.urlToImage}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${
                  result.author != null ? result.author.slice(0, 40) : ''
                }</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
      this._parentElement.insertAdjacentHTML('beforeend', itemMarkup);
    }
  }
}

export default new ResultsView();
