const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit : '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit : '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit : '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit : 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit : '',
  }
];


const formElement = document.querySelector('.img-upload__form');
const imgDefaultElement = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderDeffaultElement = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

const [deffaultEffects] = EFFECTS;
let chosenEffect =  deffaultEffects;

const isDefault = () => chosenEffect === deffaultEffects;

const updateSlider = () => {
  sliderElement.classList.remove('hidden');
  sliderDeffaultElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if(isDefault()) {
    sliderElement.classList.add('hidden');
    sliderDeffaultElement.classList.add('hidden');
  }
};

const onFormChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider();
};

const onSliderUpdate = () => {
  imgDefaultElement.style.filter = 'none';
  imgDefaultElement.className = '';
  effectLevelValue.value = '';
  if(isDefault()){
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  imgDefaultElement.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  imgDefaultElement.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLevelValue.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = deffaultEffects;
  updateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: deffaultEffects.min,
    max: deffaultEffects.max,
  },
  step: deffaultEffects.step,
  start: deffaultEffects.max,
  connect: 'lower',
});

updateSlider();

formElement.addEventListener('change', onFormChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
