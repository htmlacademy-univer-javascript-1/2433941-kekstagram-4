const RERENDER_DELAY = 500;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqueRandomElementsArray = (photos, count) => {
  const copiedArray = photos.slice();
  const uniqueElementsArray = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomInteger(0, copiedArray.length - 1);
    uniqueElementsArray.push(copiedArray[randomIndex]);
    copiedArray.splice(randomIndex, 1);
  }
  return uniqueElementsArray;
};

const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export{getRandomInteger, getUniqueRandomElementsArray, isEscapeKey, debounce, getRandomArrayElement};
