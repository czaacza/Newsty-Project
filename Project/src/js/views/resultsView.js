import icons from 'url:../../img/icons.svg';
class ResultsView {
  #parentElement = document.querySelector('.results');
  #paginationElement = document.querySelector('.pagination');
  #prevButtonElement;
  #nextButtonElement;
  #itemsPerPage = 10;
  #currentPage = 1;

  #articles;

  renderResults(articles) {
    this.#articles = articles;
    this.#clear();

    this.#displayPage();
    this.#displayPagination();
  }

  #displayPage() {
    let startIndex = this.#itemsPerPage * (this.#currentPage - 1);
    let endIndex = startIndex + this.#itemsPerPage;
    let paginatedItems = this.#articles.slice(startIndex, endIndex);
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
      this.#parentElement.insertAdjacentHTML('beforeend', itemMarkup);
    }
  }

  #displayPagination() {
    this.#paginationElement.innerHTML = '';
    // create buttons
    this.#createPaginationButtons();

    if (this.#currentPage > 1) {
      this.#paginationElement.appendChild(this.#prevButtonElement);
    }

    if (this.#currentPage < this.#articles.length / this.#itemsPerPage) {
      this.#paginationElement.appendChild(this.#nextButtonElement);
    }

    this.addButtonsListeners();
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

  addButtonsHandler(handler) {}

  addButtonsListeners() {
    if (this.#prevButtonElement) {
      this.#prevButtonElement.addEventListener(
        'click',
        function () {
          this.#currentPage--;
          this.renderResults(this.#articles);
        }.bind(this)
      );
    }
    if (this.#nextButtonElement) {
      this.#nextButtonElement.addEventListener(
        'click',
        function () {
          this.#currentPage++;
          this.renderResults(this.#articles);
        }.bind(this)
      );
    }
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new ResultsView();
