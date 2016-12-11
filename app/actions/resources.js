/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'types';

polyfill();

export function makeResourceRequest(method, id, data, api = '/resource') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}


export function destroy(id) {
  return { type: types.DESTROY_RESOURCE, id };
}


export function typing(value, field ) {
  switch (field) {
    case 'name':
      console.log('changing name field');
      return {
         type: types.TYPING,
         newResource: {name: value}
       }
      break;
    case 'address':
      console.log('changing address field');
      return {
         type: types.TYPING,
         newResource: {address: value}
       }
      break;
    case 'resource_type':
      console.log('changing resource_type field');
      return {
         type: types.TYPING,
         newResource: {resource_type: value}
       }
      break;
    case 'website_url':
      console.log('changing website_url field');
      return {
         type: types.TYPING,
         newResource: {website_url: value}
       }
      break;
    case 'phone_number':
      console.log('changing phone_number field');
      console.log(value.typeof);
      return {
         type: types.TYPING,
         newResource: {phone_number: value}
       }
      break;
    case 'zipcode':
      console.log('changing zipcode field');
      return {
         type: types.TYPING,
         newResource: {zipcode: value}
       }
      break;
    case 'service_region':
      console.log('changing service_region field');
      return {
         type: types.TYPING,
         newResource: {service_region: value}
       }
      break;
    case 'description':
      console.log('changing description field');
      return {
         type: types.TYPING,
         newResource: {description: value}
       }
      break;
    default:

  }
}

/*
 * @param data
 * @return a simple JS object
 */
export function createResourceRequest(data) {
  return {
    type: types.CREATE_RESOURCE_REQUEST,
    name: data.name,
    resource_type: data.resource_type,
    phone_number: data.phone_number,
    address: data.address,
    website_url: data.website_url,
    zipcode: data.zipcode,
    description: data.description,
    service_region: data.service_region
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
export function createResource(newResource) {

  return (dispatch, getState) => {
    console.log('in create resource',Object.keys(newResource).length, '...>', newResource);
    if (Object.keys(newResource).length <= 0) return;

    const id = md5.hash(newResource.name);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { resource } = getState();
    const data = {
      id,
      name: newResource.name,
      resource_type: newResource.resource_type,
      phone_number: newResource.phone_number,
      address: newResource.address,
      website_url: newResource.website_url,
      zipcode: newResource.zipcode,
      description: newResource.description,
      service_region: newResource.service_region
    };

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
    console.log("before makeResourceRequest");
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
