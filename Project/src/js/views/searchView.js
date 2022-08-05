class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        handler();
        this.#clearInput();
      }.bind(this)
    );
  }

  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }
}
export default new SearchView();
