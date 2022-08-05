import View from './View.js';
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _paginationElement = document.querySelector('.pagination');
  #prevButtonElement;
  #nextButtonElement;
  #itemsPerPage = 10;
  #currentPage = 1;

  // _render(articles) {
  //   this._data = articles;
  //   this.#clear();

  //   this.#displayPage();
  //   this.#displayPagination();
  // }

  _displayData() {
    this._displayResults();
    this.#displayPagination();
  }

  _displayResults() {
    let startIndex = this.#itemsPerPage * (this.#currentPage - 1);
    let endIndex = startIndex + this.#itemsPerPage;
    let paginatedItems = this._data.slice(startIndex, endIndex);
    for (let item of paginatedItems) {
      const itemMarkup = `<li class="preview">
            <a class="preview__link preview__link--active" href="#${item.id}">
              <figure class="preview__fig">
                <img src="${item.urlToImage}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${item.title}</h4>
                <p class="preview__publisher">${
                  item.author != null ? item.author.slice(0, 40) : ''
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

  #displayPagination() {
    this._paginationElement.innerHTML = '';
    // create buttons
    this.#createPaginationButtons();

    if (this.#currentPage > 1) {
      this._paginationElement.appendChild(this.#prevButtonElement);
    }

    if (this.#currentPage < this._data.length / this.#itemsPerPage) {
      this._paginationElement.appendChild(this.#nextButtonElement);
    }

    this._addButtonsListeners();
  }

  #createPaginationButtons() {
    const prevButtonElement = document.createElement('button');
    prevButtonElement.classList.add('btn--inline', 'pagination__btn--prev');
    const prevButtonInsideMarkup = `<svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${this.#currentPage - 1}</span>`;
    prevButtonElement.innerHTML = prevButtonInsideMarkup;

    // create nextButtonElement
    const nextButtonElement = document.createElement('button');
    nextButtonElement.classList.add('btn--inline', 'pagination__btn--next');
    let nextButtonInsideMarkup = `<span>Page ${this.#currentPage + 1}</span>
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
    </svg>`;

    nextButtonElement.innerHTML = nextButtonInsideMarkup;

    this.#prevButtonElement = prevButtonElement;
    this.#nextButtonElement = nextButtonElement;
  }

  _addButtonsHandler(handler) {}

  _addButtonsListeners() {
    if (this.#prevButtonElement) {
      this.#prevButtonElement.addEventListener(
        'click',
        function () {
          this.#currentPage--;
          this._render(this._data);
        }.bind(this)
      );
    }
    if (this.#nextButtonElement) {
      this.#nextButtonElement.addEventListener(
        'click',
        function () {
          this.#currentPage++;
          this._render(this._data);
        }.bind(this)
      );
    }
  }

  #clear() {
    this._parentElement.innerHTML = '';
  }
}

export default new ResultsView();
