import {isEscapeKey} from './util.js';
import{MAX_COMMENT_LENGTH, MAX_TEGS_COUNT} from './data.js';
import {resetEffects} from './effects.js';
import {clearScaleValue} from './scale.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import { sendData } from './api.js';


const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imageUploadForm = document.querySelector('.img-upload__input');
const closeFormButton = document.querySelector('.img-upload__cancel');
const imageRedactForm = document.querySelector('.img-upload__overlay');
const commentsField = document.querySelector('.text__description');
const hashtagsField = document.querySelector('.text__hashtags');
const picturePreview = document.querySelector('.img-upload__preview img');
const submitButton = form.querySelector('.img-upload__submit');

const onClickButtonnClose = () => closeFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
});

const onClickEscButton = () => document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
});

form.addEventListener('change', () => {
  imageRedactForm.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onClickEscButton);
  document.addEventListener('click', onClickButtonnClose);
});

// Выбор не стрелочной функции обусловлен порядком вызова функций
function closeForm(){
  body.classList.remove('modal-open');
  imageRedactForm.classList.add('hidden');
  closeFormButton.removeEventListener('click', onClickButtonnClose());
  document.removeEventListener('keydown', onClickEscButton());
  imageUploadForm.value = '';
  form.reset();
  clearScaleValue();
  resetEffects();
}

const hashtagRegular = /^#[a-zР°-СЏС‘0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

imageUploadForm.addEventListener('change', () => {
  imageRedactForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.effect-level__slider').parentNode.classList.add('hidden');
  document.querySelector('.scale__control--value').value = '100%';
  picturePreview.removeAttribute('style');
  closeFormButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', onClickEscButton);
});

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(commentsField, validateComment, 'Комментарий до 140 символов');

const validateHashtagsCount = (value) => value.trim().split(' ').length <= MAX_TEGS_COUNT;

const validateHashtags = (value) => value.trim() === '' ? true : value.trim().split(' ').every((hashtag) => hashtagRegular.test(hashtag));

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
        commentsField.value = '';
        hashtagsField.value = '';
      })
      .catch(() => showErrorMessage());
    submitButton.disabled = false;
    closeForm();
  }
});
