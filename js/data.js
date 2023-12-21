import {getRandomInteger, getRandomArrayElement} from './util.js';

const PICTURES_ID = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 30;
const AVATAR_COUNT = 6;
const MAX_MESSAGES_COUNT = 2;
const LOADED_COMMENTS = 5;
const MAX_COMMENTS_LENGTH = 140;
const MAX_TEGS_COUNT = 5;
const MAX_SCALE_RANGE = 100;
const MIN_SCALE_RANGE = 25;
const NUMBER_OF_PHOTOS = 10;
const RERENDER_DELAYS = 500;

const DESCRIPTION_TEXTS = [
  'Я не хочу быть в отношениях, я лучше буду в мерседесе.',
  'С прекрасной девушкой приходят большие расходы.',
  'Сегодня утром я собирался захватить мир, но проспал. Отложим на завтра.',
  'Я не ленивый. Я нахожусь в режиме энергосбережения.',
  'Вы делаете потрясающие вещи, не осознавая этого.',
  'Не останавливайся, забудь что это такое.',
  'Будьте счастливы. Это сводит людей с ума.',
  'Сегодня лучший день.',
  'Иметь мягкое сердце в жестоком мире — это сила, а не слабость.',
  'Пятница — мое второе любимое слово.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Анна',
  'Дмитрий',
  'Алексей',
  'Марина',
  'Геннадий',
  'Ольга',
  'Иван',
  'Денис',
  'Ксения',
  'Елизавета',
];

const getSerialNumber = () => {
  let currentId = 0;
  return () => ++currentId;
};

const getCurrentId = getSerialNumber();
const getPictureId = getSerialNumber();
const getUrlId = getSerialNumber();

const getRandomComment = () => ({
  id: getCurrentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: Array.from(new Array(getRandomInteger(1, MAX_MESSAGES_COUNT)), () => getRandomArrayElement(MESSAGES)).join(' '),
  name: getRandomArrayElement(NAMES),
});

const createPicturePost = () => ({
  id: getPictureId(),
  url: `photos/${getUrlId()}.jpg`,
  desription: getRandomArrayElement(DESCRIPTION_TEXTS),
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from(new Array(getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT)), () => getRandomComment()),
});

const createPicturePosts = () => Array.from({length: PICTURES_ID}, () => createPicturePost());

export {createPicturePosts};
export{LOADED_COMMENTS};
export{MAX_COMMENTS_LENGTH, MAX_TEGS_COUNT};
export{MIN_SCALE_RANGE, MAX_SCALE_RANGE};
export {NUMBER_OF_PHOTOS};
export {RERENDER_DELAYS};
