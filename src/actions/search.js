
import * as elasticsearch from '../data/elasticsearch';
const client = new elasticsearch.Client({host: 'http://localhost:9200'});

import * as events from './events';
import * as navigation from './navigation';
import * as users from './users';

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
    if(params.gender) {
      query.match.gender = params.gender;
    }
    if(params.level) {
      query.match.level = params.level;
    }
    if(params.courtType && params.courtType !== 'both') {
      query.match.courtType = params.courtType;
    }
    //TODO radius search

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

export const searchUsers = (params) => {
  return dispatch => {
    let query = {
      match: {},
    };

    if(params.name) {
      query.match.name = params.name;
    }

    client.search('test/users', {query}).then((results) => {
      dispatch({
        type: 'SEARCH_USERS_END',
        results,
      });

      if(results.hits && results.hits.hits) {
        results.hits.hits.forEach(hit => {
          dispatch(users.load(hit._id));
        });
      }
    }).catch((err) => {
      dispatch({
        type: 'SEARCH_USERS_ERROR',
        err,
      });
    });
  };
};
