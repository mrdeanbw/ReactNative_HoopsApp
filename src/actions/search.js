
import * as elasticsearch from '../data/elasticsearch';
const client = new elasticsearch.Client({host: 'http://localhost:9200'});

import * as events from './events';
import * as navigation from './navigation';

export const search = (params) => {
  return dispatch => {
    dispatch({
      type: 'SEARCH_START',
      params,
    });

    let query = {
      match: {
      },
    };

    if(params.text) {
      query.match.title = params.text;
    }

    client.search('test/events', {query}).then((results) => {
      dispatch({
        type: 'SEARCH_END',
        results
      });

      //If we got some results, load the event objects from database
      if(results.hits && results.hits.hits) {
        results.hits.hits.forEach(hit => {
          dispatch(events.load(hit._id));
        });
      }

      //Navigate to the results page
      dispatch(navigation.push({key: 'searchResults'}));

    }).catch((err) => {
      dispatch({
        type: 'SEARCH_ERROR',
        err,
      });
    });
  };
};
