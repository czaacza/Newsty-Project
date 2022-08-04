import icons from 'url:../../img/icons.svg';
class ResultsView {
  #parentElement = (resultsUl = document.querySelector('.results'));
  #itemsPerPage = 10;
  #currentPage = 1;

  renderResults(articles) {
    this.#parentElement.innerHTML = '';
    for (let i = 0; i < this.#itemsPerPage; i++) {
      const markup = `<li class="preview">
            <a class="preview__link preview__link--active" href="#${articles[i].id}">
              <figure class="preview__fig">
                <img src="${articles[i].urlToImage}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${articles[i].title}</h4>
                <p class="preview__publisher">${articles[i].author}n</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
      this.#parentElement.insertAdjacentHTML('beforeend', markup);
    }
  }

  #displayOnePage(articles) {
    let loopStart = this.#itemsPerPage * (this.#currentPage - 1);
  }
}
export default new ResultsView();
