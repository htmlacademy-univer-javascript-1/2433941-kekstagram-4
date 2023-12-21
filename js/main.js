import './thumbnails.js';
import './working-with-form.js';
import './effects.js';
import './scale.js';
import { getData } from './api.js';
import { thumbnailsList } from './thumbnails.js';

const loadPictures = async () => {
  try {
    thumbnailsList(await getData());
  }
  catch (err){
    const alertMessage = document.querySelector('#alert').content;
    alertMessage.querySelector('.alert_message').textContent = err.message;
    document.body.append(alertMessage);
  }
};

loadPictures();
