import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _prevButtonElement = document.createElement('button');
  _nextButtonElement = document.createElement('button');

  _displayData() {
    const numPages = Math.ceil(
      this._data.articles.length / this._data.resultsPerPage
    );
    this._createButtons();

    if (this._data.currentPage > 1) {
      this._parentElement.appendChild(this._prevButtonElement);
    }
    if (this._data.currentPage < numPages && numPages > 1) {
      this._parentElement.appendChild(this._nextButtonElement);
    }
  }

  _createButtons() {
    this._prevButtonElement.classList.add(
      'btn--inline',
      'pagination__btn--prev'
    );
    this._nextButtonElement.classList.add(
      'btn--inline',
      'pagination__btn--next'
    );

    const prevButtonInsideMarkup = `<svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${this._data.currentPage - 1}</span>`;

    const nextButtonInsideMarkup = `<span>Page ${
      this._data.currentPage + 1
    }</span>
              <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
              </svg>`;

    this._prevButtonElement.innerHTML = prevButtonInsideMarkup;
    this._nextButtonElement.innerHTML = nextButtonInsideMarkup;
  }

  addHandlerButtons(prevButtonHandler, nextButtonHandler) {
    if (this._prevButtonElement) {
      this._prevButtonElement.addEventListener('click', prevButtonHandler);
    }
    if (this._nextButtonElement) {
      this._nextButtonElement.addEventListener('click', nextButtonHandler);
    }
  }
}

export default new PaginationView();
