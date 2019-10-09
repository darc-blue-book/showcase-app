import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISponsor, defaultValue } from 'app/shared/model/sponsor.model';

export const ACTION_TYPES = {
  FETCH_SPONSOR_LIST: 'sponsor/FETCH_SPONSOR_LIST',
  FETCH_SPONSOR: 'sponsor/FETCH_SPONSOR',
  CREATE_SPONSOR: 'sponsor/CREATE_SPONSOR',
  UPDATE_SPONSOR: 'sponsor/UPDATE_SPONSOR',
  DELETE_SPONSOR: 'sponsor/DELETE_SPONSOR',
  RESET: 'sponsor/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISponsor>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SponsorState = Readonly<typeof initialState>;

// Reducer

export default (state: SponsorState = initialState, action): SponsorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SPONSOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SPONSOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SPONSOR):
    case REQUEST(ACTION_TYPES.UPDATE_SPONSOR):
    case REQUEST(ACTION_TYPES.DELETE_SPONSOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SPONSOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SPONSOR):
    case FAILURE(ACTION_TYPES.CREATE_SPONSOR):
    case FAILURE(ACTION_TYPES.UPDATE_SPONSOR):
    case FAILURE(ACTION_TYPES.DELETE_SPONSOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SPONSOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SPONSOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SPONSOR):
    case SUCCESS(ACTION_TYPES.UPDATE_SPONSOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SPONSOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/sponsors';

// Actions

export const getEntities: ICrudGetAllAction<ISponsor> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SPONSOR_LIST,
  payload: axios.get<ISponsor>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISponsor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SPONSOR,
    payload: axios.get<ISponsor>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISponsor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SPONSOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISponsor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SPONSOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISponsor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SPONSOR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
