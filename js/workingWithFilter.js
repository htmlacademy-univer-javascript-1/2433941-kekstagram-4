const smallerScale = document.querySelector('.scale__control--smaller');
const biggerScale = document.querySelector('.scale__control--bigger');
const inputScale = document.querySelector('.scale__control--value');
const previewChangesPicture = document.querySelector('.img-upload__preview img');
const sliderValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.effect-level__slider');
const elementsFilter = document.querySelectorAll('.effects__item');
let titleFilter = '';

smallerScale.addEventListener('click', () => {
  const scaleInputValue = Number(inputScale.value.split('%')[0]);
  if (scaleInputValue - 25 >= 25) {
    inputScale.value = `${scaleInputValue - 25}%`;
    previewChangesPicture.style.transform = `scale(${Number(inputScale.value.split('%')[0])/100})`;
  }
});

biggerScale.addEventListener('click', () => {
  const scaleInputValue = Number(inputScale.value.split('%')[0]);
  if (scaleInputValue + 25  <= 100) {
    inputScale.value = `${scaleInputValue + 25}%`;
    previewChangesPicture.style.transform = `scale(${Number(inputScale.value.split('%')[0])/100})`;
  }
});

noUiSlider.create(sliderContainer, {
  connect: 'lower',
  start: 1,
  step: 0.1,
  range: {'min': 0, 'max': 1},
});

sliderContainer.noUiSlider.on('update', () => {
  sliderValue.value = sliderContainer.noUiSlider.get();
  previewChangesPicture.style.filter = `${titleFilter.split(' ')[0]}(${sliderValue.value}${titleFilter.split(' ')[1]})`;
});

elementsFilter.forEach((filter) => {
  const filterValue = filter.querySelector('input').value;
  switch (filterValue) {
    case 'none':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.add('hidden');
        previewChangesPicture.style.filter = 'none';
      });
      break;
    case 'chrome':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        titleFilter = 'grayscale ';
        sliderContainer.noUiSlider.updateOptions({
          start: 1,
          step: 0.1,
          range: {'min': 0, 'max': 1},
        });
      });
      break;
    case 'sepia':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        titleFilter = 'sepia ';
        sliderContainer.noUiSlider.updateOptions({
          start: 1,
          step: 0.1,
          range: {'min': 0, 'max': 1},
        });
      });
      break;
    case 'marvin':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        titleFilter = 'invert %';
        sliderContainer.noUiSlider.updateOptions({
          step: 1,
          start: 100,
          range: { 'min': 0, 'max': 100 }
        });
      });
      break;
    case 'phobos':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        titleFilter = 'blur px';
        sliderContainer.noUiSlider.updateOptions({
          step: 0.1,
          start: 3,
          range: { 'min': 0, 'max': 3 }
        });
      });
      break;
    case 'heat':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        titleFilter = 'brightness ';
        sliderContainer.noUiSlider.updateOptions({
          step: 0.1,
          start: 3,
          range: { 'min': 1, 'max': 3}
        });
      });
      break;
  }
});
