
import qs from 'qs';

import Config from '../config';
const API_KEY = Config.GOOGLE_PLACES_API_KEY;


//`timeout` allows us to cancel previous autocomplete attempts if a new one arrives
let timeout;

const autocompleteDelay = 300; //ms

/*
 * Returns a promise
 */
export const autocomplete = (input, type = '(cities)') => {
  return new Promise((resolve, reject) => {
    if(!input) {
      reject();
    }

    let query = qs.stringify({
      key: API_KEY,
      input: input,
      type: type,
      components: 'country:uk',
    });


    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${query}`;

    //cancel previous autocomplete request and start a new one
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      resolve(
        fetch(url)
          .then(result => result.json())
          .catch(err => console.warn(err)) //eslint-disable-line no-console
      );
    }, autocompleteDelay);
  });
};

export const getPlace = (placeId) => {
  let query = qs.stringify({
    key: API_KEY,
    placeid: placeId,
  });

  let url = `https://maps.googleapis.com/maps/api/place/details/json?${query}`;

  return fetch(url).then(result => result.json());
};
