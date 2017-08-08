//import * as elasticsearch from '../data/elasticsearch';

//TODO This access directly to elasticsearch is not secure. We need to get a paid plan
//const client = new elasticsearch.Client({host: 'https://1nskag9:to8ns327hsvi000s@dogwood-428370.us-east-1.bonsai.io'});

import moment from 'moment'

import actionTypes, {eventActions, navigationActions, usersActions} from './'
import axios from 'axios';

// ---------

export const searchEvents = (params) => {
  const searchString = params.text ? params.text.toLowerCase() : ''
  //console.log("searchString", searchString);
  console.log("params", params);
  return (dispatch, getState) => {
    var events;
    var users;
    var matches;
    
    axios.get('https://us-central1-hoops-21a72.cloudfunctions.net/searchEvents', {
        params: {
          searchkey: params
        }
      })
      .then(function (response) {
        if (response.data){
          console.log("response in searchGeneral1", response.data);

          matches = Object.keys(response.data).map(eventId => {
            return {
              ...response.data[eventId],
              id : response.data[eventId].objectID
            }
          })

          console.log("matches", matches);
          //We use this format because it is what elasticsearch will return
          let results = {
            hits: {
              total: matches.length,
              hits: matches.map(event => ({
                _id: event.id,
              })),
            },
          }

          dispatch({
            type: actionTypes.SEARCH_END,
            results,
          })
          //If we got some results, load the event objects from database
          if(results.hits && results.hits.hits) {
            results.hits.hits.forEach(hit => {
              dispatch(eventActions.load(hit._id))
            })
          }
          //Navigate to the results page
          dispatch(navigationActions.push({key: 'searchResults'}))
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
}

// -------
export const searchEvents1 = (params) => {
  console.log("params", params);

  return (dispatch, getState) => {
    let allEvents = getState().events.eventsById
    console.log("_____all events", allEvents);

    let matches = Object.keys(allEvents).map(id => {
      return {
        ...allEvents[id],
        id: id,
      }
    }).filter(event => {
      if(params.activity && params.activity !== event.activity) {
        return false
      }
      if(params.text && event.title.toLowerCase().search(params.text.toLowerCase()) === -1) {
        return false
      }
      if(params.gender && params.gender !== event.gender) {
        return false
      }
      if(params.level && params.level !== event.level) {
        return false
      }
      if(params.courtType && params.courtType !== 'both') {
        if(params.courtType !== event.courtType) {
          return false
        }
      }

      if(params.geospatial && params.geospatial.radius && event.addressCoords) {

        //Very simple approximate radius calculation (pythagoras)
        let dLat = params.geospatial.coords.latitude - event.addressCoords.lat
        let dLon = params.geospatial.coords.longitude - event.addressCoords.lon
        let distance = Math.sqrt(Math.pow(dLat, 2) + Math.pow(dLon, 2))

        //Each degree of latitude is approximately 70 miles
        distance = distance * 70

        if(params.geospatial.radius <= distance) {
          return false
        }
      }

      //Remove expired events
      if(moment(event.date).isBefore()){
        return false
      }

      return true
    })
    .filter(event => event.privacy === 'public')
    .filter(event => !event.cancelled)

    //We use this format because it is what elasticsearch will return
    let results = {
      hits: {
        total: matches.length,
        hits: matches.map(event => ({
          _id: event.id,
        })),
      },
    }

    dispatch({
      type: actionTypes.SEARCH_END,
      results,
    })

    //If we got some results, load the event objects from database
    if(results.hits && results.hits.hits) {
      results.hits.hits.forEach(hit => {
        dispatch(eventActions.load(hit._id))
      })
    }

    //Navigate to the results page
    dispatch(navigationActions.push({key: 'searchResults'}))
  }
}
// --------------
// export const searchGeneral = (params) => {
//   return (dispatch, getState) => {
//     const allEvents = getState().events.eventsById
//     console.log("__allEvents", allEvents);

//     const allUsers = getState().users.usersById

//     console.log("__allUsers", allUsers);
//     const searchString = params.text ? params.text.toLowerCase() : ''
//     console.log("searchString", searchString);
    
//     let events = Object.keys(allEvents).map(eventId => {
//         return {
//           ...allEvents[eventId],
//           id: eventId,
//         }
//       })
//       .filter(event => event.title.toLowerCase().startsWith(searchString))
//       .filter(event => moment(event.date).isAfter())
//       .filter(event => event.privacy === 'public')
//       .filter(event => !event.cancelled)

//     let users = Object.keys(allUsers).map(userId => {
//       return {
//         ...allUsers[userId],
//         id: userId,
//       }
//     }).filter(user => {
//       if(user.name) {
//         return user.name.toLowerCase().includes(searchString.toLowerCase())
//       }else{
//         return false
//       }
//     })

//     events.forEach(event => dispatch(eventActions.load(event.id)))
//     users.forEach(user => dispatch(usersActions.load(user.id)))
//     console.log("123", events, users);
//     dispatch({
//       type: actionTypes.SEARCH_GENERAL,
//       events,
//       users
//     })
//   }
// }

// ---------

export const searchGeneral = (params) => {
  const searchString = params.text ? params.text.toLowerCase() : ''
  
  let timeout1
  let timeout2
  const autocompleteDelay = 1000 //ms

  return (dispatch, getState) => {
    var events;
    var users;
    
    
    //cancel previous autocomplete request and start a new one
    clearTimeout(timeout1)
    timeout1 = setTimeout(() => {
      // resolve(
        // fetch(url)
        //   .then(result => result.json())
        //   .catch(err => console.warn(err)) //eslint-disable-line no-console

        axios.get('https://us-central1-hoops-21a72.cloudfunctions.net/searchQueryUser', {
          params: {
            searchkey: searchString
          }
        })
        .then(function (response) {
          
          if (response.data != undefined){
            users = Object.keys(response.data).map(userId => {
              return {
                ...response.data[userId],
                id : response.data[userId].objectID
              }
            })
            dispatch({
              //type: actionTypes.SEARCH_GENERAL_USER,
              type: actionTypes.SEARCH_GENERAL,
              events,
              users
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        })

      // )
    }, autocompleteDelay)
    

    clearTimeout(timeout2)
    timeout2 = setTimeout(()=>{
      axios.get('https://us-central1-hoops-21a72.cloudfunctions.net/searchQueryEvent', {
        params: {
          searchkey: searchString
        }
      })
      .then(function (response) {
        if (response.data != undefined){
          console.log("response in event", response.data);
          events = Object.keys(response.data).map(eventId => {
            return {
              ...response.data[eventId],
              id : response.data[eventId].objectID
            }
          })
          dispatch({
            // type: actionTypes.SEARCH_GENERAL_EVENT,
            type: actionTypes.SEARCH_GENERAL,
            events,
            users
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    }, autocompleteDelay)
  }
}

/*
 * params.location.lat {Number}
 * params.location.lon {Number}
 * params.limit {Number}
 */
export const nearby = (params) => {
  return (dispatch, getState) => {
    let allEvents = getState().events.eventsById
    let size = 50

    let matches = Object.keys(allEvents).map(eventId => {
      return {
        ...allEvents[eventId],
        id: eventId,
      }
    }).filter(event => {
      return moment(event.date).isAfter()
    }).filter(event => {
      return params.gender === event.gender || event.gender === 'mixed'
    }).map(event => {
      if(params.lat && params.lon && event.addressCoords) {
        //Very simple approximate radius calculation (pythagoras)
        let dLat = params.lat - event.addressCoords.lat
        let dLon = params.lon - event.addressCoords.lon
        let distance = Math.sqrt(Math.pow(dLat, 2) + Math.pow(dLon, 2))

        //Each degree of latitude is approximately 70 miles
        distance = distance * 70
        event._distance = distance
      }

      return event
    }).filter(event => {
      return typeof event._distance !== 'undefined'
    }).sort((a, b) => {
      return a._distance > b._distance ? 1 : -1
    }).slice(0, size)

    //We use this format because it is what elasticsearch will return
    let results = {
      hits: {
        total: matches.length,
        hits: matches.map(event => ({
          _id: event.id,
          sort: [event._distance],
        })),
      },
    }

    //If we got some results, load the event objects from database
    if(results.hits && results.hits.hits) {
      results.hits.hits.forEach(hit => {
        dispatch(eventActions.load(hit._id))
      })
    }

    dispatch({
      type: actionTypes.SEARCH_NEARBY_END,
      results,
    })

  }
}
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
          dispatch(eventActions.load(hit._id));
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
    let allUsers = getState().users.usersById

    let matches = Object.keys(allUsers).map(id => {
      return {
        ...allUsers[id],
        id,
      }
    }).filter(user => {
      if(params.name){
        let name = user.name.toLowerCase()
        if(name.search(params.name.toLowerCase()) === -1){
          return false
        }
      }

      return true
    })

    //We use this format because it is what elasticsearch will return
    let results = {
      hits: {
        total: matches.length,
        hits: matches.map(user => ({
          _id: user.id,
        })),
      },
    }

    if(results.hits && results.hits.hits) {
      results.hits.hits.forEach(hit => {
        dispatch(usersActions.load(hit._id))
      })
    }

    dispatch({
      type: actionTypes.SEARCH_USERS_END,
      results,
    })

  }
}

/* For now, we do local searching only
export const searchUsers = (params) => {
  return dispatch => {
    let query = {
      match: {},
    };

    if(params.name) {
      query.match['name'] = params.name;
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
