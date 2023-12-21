import { openPicture } from './fullsize-picture.js';

const userPhotosList = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const createPhotoElements = (photos) => {
  const photosListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = userPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photosListFragment.appendChild(photoElement);
    photoElement.addEventListener('click', () => {
      openPicture(photo);
    });
  });

  userPhotosList.appendChild(photosListFragment);
};

export{createPhotoElements};
