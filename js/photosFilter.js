import {renderPictures} from './renderPictures.js';
import {debounce, getUniqueRandomElementsArray} from './util.js';

const AMOUNT_RANDOM_PICTURES = 10;

const filterSection = document.querySelector('.img-filters');
const defaultfFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const comparePhotosByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;
const getSortedPhoto = (photo) => photo.slice().sort(comparePhotosByComments);

const removePhotos = () => {
  const picture = document.querySelectorAll('.picture');
  picture.forEach((photo) => {
    photo.remove();
  });
};

const changePhoto = (array, button) => {
  removePhotos();
  const active = document.querySelector('.img-filters__button--active');
  active.classList.remove('img-filters__button--active');
  renderPictures(array);
  button.classList.add('img-filters__button--active');
};

const showFilteredPhotos = (photos) => {
  renderPictures(photos);
  filterSection.classList.remove('img-filters--inactive');
  defaultfFilter.addEventListener('click', debounce(() => {
    changePhoto(photos, defaultfFilter);
  }));
  randomFilter.addEventListener('click', debounce(() => {
    changePhoto(getUniqueRandomElementsArray(photos, AMOUNT_RANDOM_PICTURES), randomFilter);
  }));
  discussedFilter.addEventListener('click', debounce(() => {
    changePhoto(getSortedPhoto(photos), discussedFilter);
  }));
};

export {showFilteredPhotos};
