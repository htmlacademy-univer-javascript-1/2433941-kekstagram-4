import {isEscapeKey} from './util.js';
import{MAX_LENGTH_COMMENT, MAX_COUNT_TEGS} from './data.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './messageFromForm.js';


const body = document.body;
const form = document.querySelector('.img-upload__form');
const pictureUploadInput = form.querySelector('.img-upload__input');
const closeButton = form.querySelector('.img-upload__cancel');
const pictureOverlay = form.querySelector('.img-upload__overlay');
const commentField = form.querySelector('.text__description');
const hashtagsField = form.querySelector('.text__hashtags');
const picturePreview = document.querySelector('.img-upload__preview img');
const submitButton = form.querySelector('.img-upload__submit');

const hashtagRegExp = /^#[a-zР°-СЏС‘0-9]{1,19}$/i;
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const closeOverlay =() => {
  body.classList.remove('modal-open');
  pictureOverlay.classList.add('hidden');
  closeButton.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', closeByEscape);
  pictureUploadInput.value = '';
  pristine.reset();
};

function closeByEscape(evt) {
  if(isEscapeKey(evt)) {
    const activeElement = document.activeElement.attributes.type;
    if (typeof(activeElement) !== 'undefined' && activeElement.value === 'text'){
      evt.stopPropagation();
    }
    else {
      closeOverlay();
    }
  }
}

pictureUploadInput.addEventListener('change', () => {
  pictureOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.effect-level__slider').parentNode.classList.add('hidden');
  document.querySelector('.scale__control--value').value = '100%';
  picturePreview.removeAttribute('style');
  closeButton.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', closeByEscape);
});

const validateComment = (value) => value.length <= MAX_LENGTH_COMMENT;

pristine.addValidator(commentField, validateComment, 'Комментарий до 140 символов');

const validateHashtagsCount = (value) => value.trim().split(' ').length <= MAX_COUNT_TEGS;

const validateHashtags = (value) => value.trim() === '' ? true : value.trim().split(' ').every((hashtag) => hashtagRegExp.test(hashtag));

const validateHashtagsUniqueness  = (value) => {
  const hashtags = value.trim().split(' ');
  const tempArr = [];
  for (let i = 0; i < hashtags.length; i++){
    if(tempArr.includes(hashtags[i])){
      return false;
    }
    else {
      tempArr.push(hashtags[i]);
    }
  }
  return true;
};

pristine.addValidator(hashtagsField, validateHashtagsCount, 'Очень много хеш-тегов');
pristine.addValidator(hashtagsField, validateHashtags, 'Ошибочный хеш-тег');
pristine.addValidator(hashtagsField, validateHashtagsUniqueness, 'Хеш-тег повторяется');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    submitButton.disabled = true;
    await sendData(new FormData(form))
      .then(() => {
        showSuccessMessage();
        commentField.value = '';
        hashtagsField.value = '';
      })
      .catch(() => showErrorMessage());
    submitButton.disabled = false;
    closeOverlay();
  }
});
