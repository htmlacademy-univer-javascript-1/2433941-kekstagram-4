import {isEscapeKey} from './util.js';
import{MAX_LENGTH_COMMENT, MAX_COUNT_TEGS} from './data.js';


const body = document.body;
const form = document.querySelector('.img-upload__form');
const pictureUploadInput = form.querySelector('.img-upload__input');
const closeButton = form.querySelector('.img-upload__cancel');
const pictureOverlay = form.querySelector('.img-upload__overlay');
const commentsField = form.querySelector('.text__description');
const hashtagsField = form.querySelector('.text__hashtags');

const closeOverlay =() => {
  body.classList.remove('modal-open');
  pictureOverlay.classList.add('hidden');
  closeButton.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', closeByEscape);
  pictureUploadInput.value = '';
};

function closeByEscape(evt) {
  if(isEscapeKey) {
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
  closeButton.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', closeByEscape);
});

const hashtagRegular = /^#[a-zР°-СЏС‘0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const validateComment = (value) => value.length <= MAX_LENGTH_COMMENT;

pristine.addValidator(commentsField, validateComment, 'Комментарий до 140 символов');

const validateHashtagsCount = (value) => value.trim().split(' ').length <= MAX_COUNT_TEGS;

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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    closeOverlay();
    evt.target.reset();
  }
});
