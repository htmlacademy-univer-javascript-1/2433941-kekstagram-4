import { MIN_SCALE_RANGE, MAX_SCALE_RANGE } from './data.js';

const makeSmallerElement = document.querySelector('.scale__control--smaller');
const makeBiggerElement = document.querySelector('.scale__control--bigger');
const valueElement = document.querySelector('.scale__control--value');
const imgDefaultElement = document.querySelector('.img-upload__preview');

let sizeValue = 100;

const editSize = () => {

  makeSmallerElement.addEventListener('click', () => {
    if(sizeValue > MIN_SCALE_RANGE) {
      sizeValue -= MIN_SCALE_RANGE;
      valueElement.value = `${sizeValue}%`;
      imgDefaultElement.style.transform = `scale(${sizeValue / 100})`;
    }
  });

  makeBiggerElement.addEventListener('click', () => {
    if(sizeValue < MAX_SCALE_RANGE) {
      sizeValue += MIN_SCALE_RANGE;
      valueElement.value = `${sizeValue}%`;
      imgDefaultElement.style.transform = `scale(${sizeValue / 100})`;
    }
  });
};

const getScaleValue = (value) => {
  valueElement.value = `${value}%`;
  imgDefaultElement.style.transform = `scale(${value / 100})`;
};

getScaleValue(sizeValue);

const clearScaleValue = () => {
  sizeValue = MAX_SCALE_RANGE;
  getScaleValue(MAX_SCALE_RANGE);
  imgDefaultElement.style.transform = `scale(${sizeValue / 100})`;
};

editSize();

export {clearScaleValue};
