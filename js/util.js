import {RERENDER_DELAYS} from './data.js';

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElementsArray = (photos, count) => {
  const copiedArray = photos.slice();
  const uniqueElementsArray = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomInteger(0, copiedArray.length - 1);
    uniqueElementsArray.push(copiedArray[randomIndex]);
    copiedArray.splice(randomIndex, 1);
  }
  return uniqueElementsArray;
};


const isEscapeKey = (evt) => evt.key === 'Escape';
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const debounce = (callback, timeoutDelay = RERENDER_DELAYS) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export{getRandomInteger, getRandomArrayElement, isEscapeKey, debounce, getRandomElementsArray};
