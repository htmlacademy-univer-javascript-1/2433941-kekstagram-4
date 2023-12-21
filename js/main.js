import { getData } from './api.js';
import { initFilters } from './filters.js';
import './working-with-form.js';
import './effects.js';
import './scale.js';
import './upload-photo.js';


const loadPictures = async () => {
  try {
    initFilters(await getData());
  }
  catch (err){
    const alertMessage = document.querySelector('#alert').content;
    alertMessage.querySelector('.alert_message').textContent = err.message;
    document.body.append(alertMessage);
  }
};

loadPictures();
