import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './messageFromForm.js';

const MAX_SYMBOLS_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const FILE_TYPES = ['png', 'gif', 'jpg', 'jpeg'];

const body = document.body;
const form = document.querySelector('.img-upload__form');
const pictureUploadInput = form.querySelector('.img-upload__input');
const closeButton = form.querySelector('.img-upload__cancel');
const pictureOverlay = form.querySelector('.img-upload__overlay');
const commentField = form.querySelector('.text__description');
const hashtagsField = form.querySelector('.text__hashtags');
const picturePreview = document.querySelector('.img-upload__preview img');
const submitButton = form.querySelector('.img-upload__submit');
const pictureFile = document.querySelector('.img-upload__start input[type=file]');
const effectsPreviews = document.querySelectorAll('.effects__list span');

const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const closeOverlay = (isCleanHashtagsComment = true) => {
  body.classList.remove('modal-open');
  pictureOverlay.classList.add('hidden');
  closeButton.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', onEscapeKeydown);
  pictureUploadInput.value = '';
  pristine.reset();
  if (isCleanHashtagsComment) {
    commentField.value = '';
    hashtagsField.value = '';
  }
};

function onEscapeKeydown(evt) {
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
  document.addEventListener('keydown', onEscapeKeydown);
});

pictureFile.addEventListener('change', () => {
  const file = pictureFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  const pictureObject = URL.createObjectURL(file);
  if (matches) {
    picturePreview.src = pictureObject;
    effectsPreviews.forEach((element) => {
      element.style.backgroundImage = `url(${pictureObject})`;
    });
  }
});

const validateComment = (value) => value.length <= MAX_SYMBOLS_COMMENT_LENGTH;

pristine.addValidator(commentField, validateComment, `Комментарий должен быть не более ${MAX_SYMBOLS_COMMENT_LENGTH} символов`);

const normalizeHashtags = (hashtagsString) => hashtagsString.trim().split(' ').filter((tag) =>  Boolean(tag.length));

const validateHashtagsCount = (value) => normalizeHashtags(value).length <= MAX_HASHTAGS_COUNT;

const validateHashtags = (value) => value.trim() === '' ? true : normalizeHashtags(value).every((hashtag) => hashtagRegExp.test(hashtag));

const validateHashtagsUniqueness  = (value) => {
  const hashtags = normalizeHashtags(value.toLowerCase());
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

pristine.addValidator(hashtagsField, validateHashtagsCount, 'Слишком много хэш-тегов');
pristine.addValidator(hashtagsField, validateHashtags, 'Неправильный хеш-тег');
pristine.addValidator(hashtagsField, validateHashtagsUniqueness, 'Хеш-тег повторяется');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    submitButton.disabled = true;
    await sendData(new FormData(form))
      .then(() => {
        showSuccessMessage();
        closeOverlay();
      })
      .catch(() => {
        showErrorMessage();
        closeOverlay(false);
      });
    submitButton.disabled = false;
  }
});
