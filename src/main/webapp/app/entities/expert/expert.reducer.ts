import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IExpert, defaultValue } from 'app/shared/model/expert.model';

export const ACTION_TYPES = {
  FETCH_EXPERT_LIST: 'expert/FETCH_EXPERT_LIST',
  FETCH_EXPERT: 'expert/FETCH_EXPERT',
  CREATE_EXPERT: 'expert/CREATE_EXPERT',
  UPDATE_EXPERT: 'expert/UPDATE_EXPERT',
  DELETE_EXPERT: 'expert/DELETE_EXPERT',
  SET_BLOB: 'expert/SET_BLOB',
  RESET: 'expert/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IExpert>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ExpertState = Readonly<typeof initialState>;

// Reducer

export default (state: ExpertState = initialState, action): ExpertState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EXPERT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EXPERT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EXPERT):
    case REQUEST(ACTION_TYPES.UPDATE_EXPERT):
    case REQUEST(ACTION_TYPES.DELETE_EXPERT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EXPERT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EXPERT):
    case FAILURE(ACTION_TYPES.CREATE_EXPERT):
    case FAILURE(ACTION_TYPES.UPDATE_EXPERT):
    case FAILURE(ACTION_TYPES.DELETE_EXPERT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXPERT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXPERT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EXPERT):
    case SUCCESS(ACTION_TYPES.UPDATE_EXPERT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EXPERT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/experts';

// Actions

export const getEntities: ICrudGetAllAction<IExpert> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EXPERT_LIST,
  payload: axios.get<IExpert>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IExpert> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EXPERT,
    payload: axios.get<IExpert>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IExpert> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EXPERT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IExpert> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EXPERT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IExpert> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EXPERT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
