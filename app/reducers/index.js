import { combineReducers } from 'redux';
import user from 'reducers/user';
import resource from 'reducers/resource';
import message from 'reducers/message';
import { routerReducer as routing } from 'react-router-redux';
import * as types from 'types';

const isFetching = ( state = false, action ) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      return true;
    case types.REQUEST_SUCCESS:
    case types.REQUEST_FAILURE:
      return false;
    default:
      return state;
  }
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  resource,
  user,
  message,
  routing
});

export default rootReducer;
