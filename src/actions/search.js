
//import * as elasticsearch from '../data/elasticsearch';

//TODO This access directly to elasticsearch is not secure. We need to get a paid plan
//const client = new elasticsearch.Client({host: 'https://1nskag9:to8ns327hsvi000s@dogwood-428370.us-east-1.bonsai.io'});

import moment from 'moment';

import * as eventsActions from './events';
import * as navigationActions from './navigation';
import * as usersActions from './users';

export const searchEvents = (params) => {

  return (dispatch, getState) => {
    let allEvents = getState().events.all;

    let matches = Object.keys(allEvents).map(id => {
      return {
        ...allEvents[id],
        id: id,
      };
    }).filter(event => {
      if(params.activity && params.activity !== event.activity) {
        return false;
      }
      if(params.text && event.title.toLowerCase().search(params.text.toLowerCase()) === -1) {
        return false;
      }
      if(params.gender && params.gender !== event.gender) {
        return false;
      }
      if(params.level && params.level !== event.level) {
        return false;
      }
      if(params.courtType && params.courtType !== 'both') {
        if(params.courtType !== event.courtType) {
          return false;
        }
      }

      if(params.geospatial && params.geospatial.radius && event.addressCoords) {

        //Very simple approximate radius calculation (pythagoras)
        let dLat = params.geospatial.coords.latitude - event.addressCoords.lat;
        let dLon = params.geospatial.coords.longitude - event.addressCoords.lon;
        let distance = Math.sqrt(Math.pow(dLat, 2) + Math.pow(dLon, 2));

        //Each degree of latitude is approximately 70 miles
        distance = distance * 70;

        if(params.geospatial.radius <= distance) {
          return false;
        }
      }

      //Remove expired events
      if(moment(event.date).isBefore()){
        return false;
      }

      return true;
    });

    //We use this format because it is what elasticsearch will return
    let results = {
      hits: {
        total: matches.length,
        hits: matches.map(event => ({
          _id: event.id,
        })),
      },
    };

    dispatch({
      type: 'SEARCH_END',
      results,
    });

    //If we got some results, load the event objects from database
    if(results.hits && results.hits.hits) {
      results.hits.hits.forEach(hit => {
        dispatch(eventsActions.load(hit._id));
      });
    }

    //Navigate to the results page
    dispatch(navigationActions.push({key: 'searchResults'}));
  };
};

export const searchGeneral = (params) => {
  return (dispatch, getState) => {
    let allEvents = getState().events.all;
    let allUsers = getState().users.all;

    let searchString = params.text ? params.text.toLowerCase() : '';

    let events = Object.keys(allEvents).map(eventId => {
      return {
        ...allEvents[eventId],
        id: eventId,
      };
    }).filter(event => {
      return event.title.toLowerCase().search(searchString) !== -1;
    }).filter(event => {
      return moment(event.date).isAfter();
    });

    let users = Object.keys(allUsers).map(userId => {
      return {
        ...allUsers[userId],
        id: userId,
      };
    }).filter(user => {
      if(user.publicProfile && user.publicProfile.name) {
        return user.publicProfile.name.toLowerCase().search(searchString) !== -1;
      }else{
        return false;
      }
    });

    events.forEach(event => dispatch(eventsActions.load(event.id)));
    users.forEach(user => dispatch(usersActions.load(user.id)));

    dispatch({
      type: 'SEARCH_GENERAL',
      events,
      users
    });
  };
};


/* For now, we do local searching only
export const search = (params) => {
  return dispatch => {
    dispatch({
      type: 'SEARCH_START',
      params,
    });

    let query = {
      bool: {
        must: [],
        filter: [],
      },
    };

    if(params.text) {
      query.bool.must.push({
        match: {
          title: params.text,
        },
      });
    }
    if(params.gender) {
      query.bool.must.push({
        match: {
          gender: params.gender,
        },
      });
    }
    if(params.level) {
      query.bool.must.push({
        match: {
          level: params.level,
        },
      });
    }
    if(params.courtType && params.courtType !== 'both') {
      query.bool.must.push({
        match: {
          courtType: params.courtType,
        },
      });
    }

    if(params.date) {
      query.bool.filter.push({
        range: {
          date: {
            gt: params.date,
          },
        },
      });
    } else {
      //If date filter is not specified, show all events after "now"
      query.bool.filter.push({
        range: {
          date: {
            gt: "now",
          },
        },
      });
    }

    if(params.geospatial && params.geospatial.radius) {
      query.bool.filter.push({
        geo_distance: {
          distance: params.geospatial.radius + 'mi',
          addressCoords: {
            lat: params.geospatial.coords.latitude,
            lon: params.geospatial.coords.longitude,
          },
        }
      });
    }

    client.search('test/events', {query}).then((results) => {
      dispatch({
        type: 'SEARCH_END',
        results
      });

      //If we got some results, load the event objects from database
      if(results.hits && results.hits.hits) {
        results.hits.hits.forEach(hit => {
          dispatch(eventsActions.load(hit._id));
        });
      }

      //Navigate to the results page
      dispatch(navigationActions.push({key: 'searchResults'}));

    }).catch((err) => {
      dispatch({
        type: 'SEARCH_ERROR',
        err,
      });
    });

  };
};
*/

/*
 * params.location.lat {Number}
 * params.location.lon {Number}
 * params.limit {Number}
 */
export const nearby = (params) => {
  return (dispatch, getState) => {
    let allEvents = getState().events.all;
    let size = 10;

    let matches = Object.keys(allEvents).map(eventId => {
      return {
        ...allEvents[eventId],
        id: eventId,
      };
    }).filter(event => {
      return moment(event.date).isAfter();
    }).filter(event => {
      return params.gender === event.gender || event.gender === 'mixed';
    }).map(event => {
      if(params.lat && params.lon && event.addressCoords) {
        //Very simple approximate radius calculation (pythagoras)
        let dLat = params.lat - event.addressCoords.lat;
        let dLon = params.lon - event.addressCoords.lon;
        let distance = Math.sqrt(Math.pow(dLat, 2) + Math.pow(dLon, 2));

        //Each degree of latitude is approximately 70 miles
        distance = distance * 70;

        event._distance = distance;
      }

      return event;
    }).filter(event => {
      return typeof event._distance !== 'undefined';
    }).sort((a, b) => {
      return a._distance > b._distance ? 1 : -1;
    }).slice(0, size);

    //We use this format because it is what elasticsearch will return
    let results = {
      hits: {
        total: matches.length,
        hits: matches.map(event => ({
          _id: event.id,
          sort: [event._distance],
        })),
      },
    };

    //If we got some results, load the event objects from database
    if(results.hits && results.hits.hits) {
      results.hits.hits.forEach(hit => {
        dispatch(eventsActions.load(hit._id));
      });
    }

    dispatch({
      type: 'SEARCH_NEARBY_END',
      results,
    });

  };
};
/* For now, we do local searching only
export const nearby = (params) => {
  return dispatch => {
    let query = {
      match_all: {},
    };
    let sort = [{
      _geo_distance: {
        order: "desc",
        addressCoords: {
          lat: params.lat,
          lon: params.lon,
        }
      }
    }];
    let size = 10; //max number of results

    dispatch({
      type: 'SEARCH_NEARBY_START',
    });

    client.search('test/events', {size, query, sort}).then(results => {
      dispatch({
        type: 'SEARCH_NEARBY_END',
        results,
      });

      //If we got some results, load the event objects from database
      if(results.hits && results.hits.hits) {
        results.hits.hits.forEach(hit => {
          dispatch(eventsActions.load(hit._id));
        });
      }
    }).catch(err => {
      dispatch({
        type: 'SEARCH_NEARBY_ERROR',
        err,
      });
    });
  };
};
*/

export const searchUsers = (params) => {
  return (dispatch, getState) => {
    let allUsers = getState().users.all;

    let matches = Object.keys(allUsers).map(id => {
      return {
        ...allUsers[id],
        id,
      };
    }).filter(user => {
      if(params.name){
        let name = user.publicProfile.name.toLowerCase();
        if(name.search(params.name.toLowerCase()) === -1){
          return false;
        }
      }

      return true;
    });

    //We use this format because it is what elasticsearch will return
    let results = {
      hits: {
        total: matches.length,
        hits: matches.map(user => ({
          _id: user.id,
        })),
      },
    };

    if(results.hits && results.hits.hits) {
      results.hits.hits.forEach(hit => {
        dispatch(usersActions.load(hit._id));
      });
    }

    dispatch({
      type: 'SEARCH_USERS_END',
      results,
    });

  };
};

/* For now, we do local searching only
export const searchUsers = (params) => {
  return dispatch => {
    let query = {
      match: {},
    };

    if(params.name) {
      query.match['publicProfile.name'] = params.name;
    }

    client.search('test/users', {query}).then((results) => {
      dispatch({
        type: 'SEARCH_USERS_END',
        results,
      });

      if(results.hits && results.hits.hits) {
        results.hits.hits.forEach(hit => {
          dispatch(usersActions.load(hit._id));
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
*/
