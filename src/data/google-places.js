
import qs from 'qs';

const API_KEY = 'AIzaSyBopRDu051G9W6fqJCwGgzxGICzhzuUxIg';

export const autocomplete = (input, type = '(cities)') => {
  let query = qs.stringify({
    key: API_KEY,
    input: input,
    type: type,
    components: 'country:uk',
  });

  let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${query}`;

  return fetch(url).then(result => result.json());
};

export const getPlace = (placeId) => {
  let query = qs.stringify({
    key: API_KEY,
    placeid: placeId,
  });

  let url = `https://maps.googleapis.com/maps/api/place/details/json?${query}`;

  return fetch(url).then(result => result.json());
};
