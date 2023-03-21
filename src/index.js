import './css/styles.css';
import { createCountriesList } from './templates/createCountriesList.js';
import { createCountryInfo } from './templates/createCountryInfo.js';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import getRefs from './js/get-refs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

Notify.init({
  width: '300px',
  position: 'right-top',
  fontSize: '16px',
  closeButton: false,
  timeout: 3000,
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade',
  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
  info: {
    background: '#26c0d3',
    textColor: '#fff',
    childClassName: 'notiflix-notify-info',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-info-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(38,192,211,0.2)',
  },
});

refs.inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(e) {
  if (e.target.value.length === 0) {
    clearAll();
    return;
  }

  fetchCountries(e.target.value.trim())
    .then(country => {
      if (country.length > 10) {
        onNotification('info');
        return;
      }

      if (country.length === 1) {
        renderCountryInfo(country);
        return;
      }

      renderCountriesList(country);
    })
    .catch(() => {
      onNotification('failure');
    });
}

function renderCountriesList(country) {
  clearCountriesItem();
  refs.listEl.innerHTML = createCountriesList(country);
}

function renderCountryInfo(country) {
  clearCountriesList();
  refs.itemEl.innerHTML = createCountryInfo(country);
}

function clearCountriesList() {
  refs.listEl.innerHTML = '';
}

function clearCountriesItem() {
  refs.itemEl.innerHTML = '';
}

function clearAll() {
  clearCountriesList();
  clearCountriesItem();
}

function onNotification(error) {
  clearAll();
  switch (error) {
    case 'info':
      Notify.info('Too many matches found. Please enter a more specific name.');
      break;

    case 'failure':
      Notify.failure('Oops, there is no country with that name');
      break;
  }
}
