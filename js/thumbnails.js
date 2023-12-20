import {createPicturePosts} from './data.js';
import { openPicture } from './fullsize-picture.js';

const userPhotosList = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const userPhotos = createPicturePosts();
const photosListFragment = document.createDocumentFragment();

userPhotos.forEach((photo) => {
  const photoElement = userPictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photosListFragment.appendChild(photoElement);
  photoElement.addEventListener('click', () =>{
    openPicture(photo);
  });
  return photoElement;
});

userPhotosList.appendChild(photosListFragment);

export {userPhotosList};
