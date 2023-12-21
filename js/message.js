import {isEscapeKey} from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.body;

const hideMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  const messageCloseButton = document.querySelector('.success__button') ||
  document.querySelector('.error__button');
  document.removeEventListener('keydown', closeByEscape);
  body.removeEventListener('click', closeByBodyClick);
  messageCloseButton.removeEventListener('click', hideMessage);
  message.remove();
};

function closeByBodyClick(evt) {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    hideMessage();
  }
}

function closeByEscape(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (messageElement, messageCloseButton) => {
  body.append(messageElement);
  document.addEventListener('keydown', closeByEscape);
  body.addEventListener('click', closeByBodyClick);
  body.querySelector(messageCloseButton).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => showMessage(successMessage, '.success__button');

const showErrorMessage = () => showMessage(errorMessage, '.error__button');

export {showSuccessMessage, showErrorMessage};
