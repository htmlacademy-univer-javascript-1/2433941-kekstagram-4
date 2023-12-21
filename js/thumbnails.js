import { openPicture } from './fullsize-picture.js';

const userPhotosList = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const imgFiltersElement = document.querySelector('.img-filters');
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
  userPhotosList.querySelectorAll('.picture').forEach((element) => {element.remove();});
  userPhotosList.appendChild(photosListFragment);
  imgFiltersElement.classList.remove('img-filters--inactive');
};

export{createPhotoElements};
