import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddArticleView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-article-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-article');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerCloseWindow();
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

  _displayData() {}
}

export default new AddArticleView();
