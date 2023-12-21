import { createPhotoElements } from './thumbnails.js';
import {debounce, getRandomElementsArray} from './util.js';
import { NUMBER_OF_PHOTOS } from './data.js';


const imgFiltersElement = document.querySelector('.img-filters');
const defaultFilterButton = imgFiltersElement.querySelector('#filter-default');
const randomFilterButton = imgFiltersElement.querySelector('#filter-random');
const discussedFilterButton = imgFiltersElement.querySelector('#filter-discussed');


const compareThumbnails = (photoA, photoB) => {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;
  return rankB - rankA;
};
const getChangePhoto = (photo) => photo.slice().sort(compareThumbnails);

const deletePhotos = () => {
  const picture = document.querySelectorAll('.picture');
  picture.forEach((photo) => {
    photo.remove();
  });
};

const setActiveFilter = (array, button) => {
  deletePhotos();
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  createPhotoElements(array);
  button.classList.add('img-filters__button--active');
};


const initFilters = (photos) => {
  createPhotoElements(photos);
  imgFiltersElement.classList.remove('img-filters--inactive');
  defaultFilterButton.addEventListener('click', debounce(() => {
    setActiveFilter(photos, defaultFilterButton);
  }));
  randomFilterButton.addEventListener('click', debounce(() => {
    setActiveFilter(getRandomElementsArray(photos, NUMBER_OF_PHOTOS), randomFilterButton);
  }));
  discussedFilterButton.addEventListener('click', debounce(() => {
    setActiveFilter(getChangePhoto(photos), discussedFilterButton);
  }));
};

export {initFilters};
