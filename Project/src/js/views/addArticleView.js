import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddArticleView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-article-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-article');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Article was successfully uploaded!';

  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerCloseWindow();
    this.addHandlerUpload();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        const dataArray = [...new FormData(this._parentElement)];
        const data = Object.fromEntries(dataArray);
        handler(data);
        this._renderMessage();
      }.bind(this)
    );
  }

  _renderMessage() {
    const markup = `<div class="message">
        <div>
          <svg>
            <use href="${icons}.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${this._message}</p>
      </div>;`;

    this._parentElement.innerHTML = markup;
  }
}

export default new AddArticleView();
