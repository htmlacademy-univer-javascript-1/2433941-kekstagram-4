import { openPicture } from './fullsizePicture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const renderPicture = (picture) => {
  const {url, description, likes, comments} = picture;
  const clonedPicture = pictureTemplate.cloneNode(true);
  clonedPicture.querySelector('.picture__img').src = url;
  clonedPicture.querySelector('.picture__img').alt = description;
  clonedPicture.querySelector('.picture__likes').textContent = likes;
  clonedPicture.querySelector('.picture__comments').textContent = comments.length;
  clonedPicture.addEventListener('click', () =>{
    openPicture(picture);
  });
  return clonedPicture;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    fragment.appendChild(renderPicture(picture));
  });
  picturesContainer.appendChild(fragment);
};

export{renderPictures};
