const userPhotosList = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const photosListFragment = document.createDocumentFragment();

const thumbnailsList = (photo) => {
  photo.forEach(({url, comments, likes}) => {
    const photoElement = userPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photosListFragment.appendChild(photoElement);
  });
  userPhotosList.appendChild(photosListFragment);
};

userPhotosList.appendChild(photosListFragment);

export{thumbnailsList};
