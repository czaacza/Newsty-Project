import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  _render(_data) {
    if (!_data || (Array.isArray && _data.length === 0)) {
      return this._renderError(
        'No articles found for your query! Please try again.'
      );
    }
    this._data = _data;
    this._clear();

    this._displayData();
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _renderSpinner() {
    const markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _renderError(message) {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
