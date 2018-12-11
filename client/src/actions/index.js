import streams from '../apis/streams';
import history from '../history';
import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
} from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
}

export const createStream = (formValues) => async (dispatch, getState) => {
    const { userId } = getState().auth
    const response = await streams.post('/streams', { ...formValues, userId });

    dispatch ({ 
        type: CREATE_STREAM,
        payload: response.data
    })
    // Do some programmatic navigation to get the user back to the main page after creating a stream. Creating a history object so we control it ourselves, no more browserrouter because it controls the history.
    history.push('/');
};

// redux thunk allows us to take two arguments, dispatch and getstate function

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    })
}

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`streams/${id}`);

    dispatch({ 
        type: FETCH_STREAM,
        payload: response.data
    })
}

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    // Need two arguments to get the stream id and update it.
    
    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    })
    history.push("/");
}

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);
    
    dispatch({
        type: DELETE_STREAM,
        payload: id
    })
    history.push("/");
}