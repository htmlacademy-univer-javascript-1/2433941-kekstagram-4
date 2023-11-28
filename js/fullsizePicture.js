import {isEscapeKey} from './util.js';

const fullsizePicture = document.querySelector('.big-picture');
const body = document.body;
const closeButton = fullsizePicture.querySelector('#picture-cancel');

const fillComments = (comments) => {
  const commentsContainer = fullsizePicture.querySelector('.social__comments');
  const commentTemplate = fullsizePicture.querySelector('.social__comment');
  const fragment = document.createDocumentFragment();
  comments.forEach  ((comment) => {
    const clonedComment = commentTemplate.cloneNode(true);
    const {avatar, name, message} = comment;
    clonedComment.querySelector('.social__picture').src = avatar;
    clonedComment.querySelector('.social__picture').alt = name;
    clonedComment.querySelector('.social__text').textContent = message;
    fragment.append(clonedComment);
  });
  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
};

const closePicture = () => {
  body.classList.remove('modal-open');
  fullsizePicture.classList.add('hidden');
  document.removeEventListener('keydown', closeByEscape);
};

function closeByEscape() {
  if(isEscapeKey){
    closePicture();
  }
}

const openPicture = (picture) => {
  body.classList.add('modal-open');
  fullsizePicture.classList.remove('hidden');
  const {url, description, likes, comments} = picture;
  fullsizePicture.querySelector('.big-picture__img img').src = url;
  fullsizePicture.querySelector('.likes-count').textContent = likes;
  fullsizePicture.querySelector('.comments-count').textContent = comments.length;
  fillComments(picture.comments);
  fullsizePicture.querySelector('.social__caption').textContent = description;
  fullsizePicture.querySelector('.social__comment-count').classList.add('hidden');
  fullsizePicture.querySelector('.comments-loader').classList.add('hidden');
  closeButton.addEventListener('click', closePicture);
  document.addEventListener('keydown', closeByEscape);
};

export{openPicture};
