/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'types';

polyfill();

export function makeResourceRequest(method, id, data, api = '/resource') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function increment(id) {
  return { type: types.INCREMENT_COUNT, id };
}

export function decrement(id) {
  return { type: types.DECREMENT_COUNT, id };
}

export function destroy(id) {
  return { type: types.DESTROY_RESOURCE, id };
}


export function typing(value, field ) {
  console.log('typing action value: ', value, 'typing action field: ', field );


  return {
    type: types.TYPING,
      newResource: {
        name: value,
        resource_type: value,
        phone_number: value,
        address: value,
        website_url: value,
        zipcode: value,
        created_by: value,
        description: value
      }
  }
}

/*
 * @param data
 * @return a simple JS object
 */
export function createResourceRequest(data) {
  return {
    type: types.CREATE_RESOURCE_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

export function createResourceSuccess() {
  return {
    type: types.CREATE_RESOURCE_SUCCESS
  };
}

export function createResourceFailure(data) {
  return {
    type: types.CREATE_RESOURCE_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createResourceDuplicate() {
  return {
    type: types.CREATE_RESOURCE_DUPLICATE
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createResource(array) {

  return (dispatch, getState) => {
    if (array.length <= 0) return;

    const id = md5.hash(array[0]);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { resource } = getState();
    const data = {
      id,
      name: array[0],
      resource_type: array[1],
      phone_number: array[2],
      address: array[3],
      website_url: array[4],
      zipcode: array[5],
      description: array[6],
      service_region: array[7]
    };

    console.log('data from action',data);
    // Conditional dispatch
    // If the resource already exists, make sure we emit a dispatch event
    if (resource.resources.filter(resourceItem => resourceItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate resource
      return dispatch(createResourceDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createResourceRequest(data));

    return makeResourceRequest('post', id, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_RESOURCE_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createResourceSuccess());
        }
      })
      .catch(() => {
        return dispatch(createResourceFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your resource'}));
      });
  };
}

export function incrementCount(id) {
  return dispatch => {
    return makeResourceRequest('put', id, {
        isFull: false,
        isIncrement: true
      })
      .then(() => dispatch(increment(id)))
      .catch(() => dispatch(createResourceFailure({id, error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}

export function decrementCount(id) {
  return dispatch => {
    return makeResourceRequest('put', id, {
        isFull: false,
        isIncrement: false
      })
      .then(() => dispatch(decrement(id)))
      .catch(() => dispatch(createResourceFailure({id, error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}

export function destroyResource(id) {
  return dispatch => {
    return makeResourceRequest('delete', id)
      .then(() => dispatch(destroy(id)))
      .catch(() => dispatch(createResourceFailure({id,
        error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}
