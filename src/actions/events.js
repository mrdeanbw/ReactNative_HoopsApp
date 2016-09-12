
export const valueChange = (value) => {
  return (dispatch) => {
    dispatch({type: 'EVENTS_LOADED', events: value});
  };
};
