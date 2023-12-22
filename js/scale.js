import { MIN_SCALE_RANGE, MAX_SCALE_RANGE, SIZE_OF_STEPS, SIZE_DEFAULT_VALUES, SIZE_VALUES} from './data.js';

const makeSmallerElement = document.querySelector('.scale__control--smaller');
const makeBiggerElement = document.querySelector('.scale__control--bigger');
const valueElement = document.querySelector('.scale__control--value');
const imgDefaultElement = document.querySelector('.img-upload__preview img');

const editSize = () => {
  makeSmallerElement.addEventListener('click', () => {
    const scaleInputValue = Number(valueElement.value.split('%')[0]);
    if (scaleInputValue - SIZE_OF_STEPS >= MIN_SCALE_RANGE) {
      const newSizeValue = scaleInputValue - SIZE_OF_STEPS;
      valueElement.value = `${newSizeValue}%`;
      imgDefaultElement.style.transform = `scale(${newSizeValue / SIZE_DEFAULT_VALUES})`;
    }
  });

  makeBiggerElement.addEventListener('click', () => {
    const scaleInputValue = Number(valueElement.value.split('%')[0]);
    if (scaleInputValue + SIZE_OF_STEPS <= MAX_SCALE_RANGE) {
      const newSizeValue = scaleInputValue + SIZE_OF_STEPS;
      valueElement.value = `${newSizeValue}%`;
      imgDefaultElement.style.transform = `scale(${newSizeValue / SIZE_DEFAULT_VALUES})`;
    }
  });
};

const getScaleValue = (value) => {
  valueElement.value = `${value}%`;
  imgDefaultElement.style.transform = `scale(${value / SIZE_DEFAULT_VALUES})`;
};

getScaleValue(Number(valueElement.value.split('%')[0]));

const clearScaleValue = () => {
  getScaleValue(SIZE_VALUES);
  imgDefaultElement.style.transform = `scale(${SIZE_VALUES / SIZE_DEFAULT_VALUES})`;
};

editSize();

export { clearScaleValue };
