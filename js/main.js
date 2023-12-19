import { getData } from './api.js';
import {renderPictures} from './renderPictures.js';
import './workingWithForm.js';
import './workingWithFilter.js';

const loadPictures = async () => {
  try {
    renderPictures(await getData());
  }
  catch (err){
    const alertMessage = document.querySelector('#alert').content;
    alertMessage.querySelector('.alert_message').textContent = err.message;
    document.body.append(alertMessage);
  }
};

loadPictures();
