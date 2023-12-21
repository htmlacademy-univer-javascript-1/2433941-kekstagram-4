import './thumbnails.js';
import './working-with-form.js';
import './effects.js';
import './scale.js';
import { getData } from './api.js';
import { createPhotoElements } from './thumbnails.js';


const loadPictures = async () => {
  try {
    createPhotoElements(await getData());
  }
  catch (err){
    const alertMessage = document.querySelector('#alert').content;
    alertMessage.querySelector('.alert_message').textContent = err.message;
    document.body.append(alertMessage);
  }
};

loadPictures();
