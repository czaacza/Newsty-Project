import icons from 'url:../../img/icons.svg';

class ArticleView {
  #parentElement = document.querySelector('.article');
  #data;

  render(data) {
    this.#data = data;
    this.#clear();
    this.#parentElement.insertAdjacentHTML(
      'afterbegin',
      this.#generateArticleMarkup()
    );
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  #generateArticleMarkup() {
    return `<figure class="article__fig">
          <img
            src="${this.#data.urlToImage}"
            alt="Tomato"
            class="article__img"
          />
        </figure>
        <div class="article__title">
          <p>
            ${this.#data.title}
          </p>
        </div>

        <div class="article__details">
          <div class="article__info">
            <svg class="article__info-icon">
              <use href="${icons}.svg#icon-clock"></use>
            </svg>
            <span class="article__info-text">${
              this.#data.publishedAt.split('T')[0]
            }</span>
          </div>
          <div class="article__info">
            <svg class="article__info-icon">
              <use href="${icons}.svg#icon-users"></use>
            </svg>
            <span class="article__info-text">${this.#data.author}, ${
      this.#data.source.name
    }</span>
          </div>

          <div class="article__user-generated">
            <svg>
              <use href="${icons}.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="article__heading">
          <h2 class="heading--2">article</h2>
        </div>
        <div class="article__text">
          <div class="article__description">
            <p>
              ${this.#data.description}
            </p>
          </div>
          <div class="article__content">
            <p>
              ${this.#data.content}
            </p>
          </div>
        </div>

        <div class="article__directions">
          <h2 class="heading--2">Read more</h2>
          <p class="article__directions-text">
            This small excerpt from the article was brought up by
            <span class="article__publisher">Google News API</span>.
          </p>
          <p class="article__direction-text-ending">
            Check the whole article here!
          </p>
          <a
            class="btn--small article__btn"
            href="${this.#data.url}"
            target="_blank"
          >
            <span>Article</span>
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
      </div>
    </div>`;
  }

  #generateMessageMarkup() {
    return `<div class="message">
        <div>
          <svg>
            <use href="${icons}.svg#icon-smile"></use>
          </svg>
        </div>
        <p>Start by searching for an article. Have fun!</p>
      </div>;`;
  }
}

export default new ArticleView();
