import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from 'actions/types';

export const signup = (formProps, redirect) => async dispatch => {
    try {
        const response = await axios.post(
            'http://localhost:3090/signup',
            formProps
        );
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        redirect();
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error.response.data.error });
    }
};

export const signin = (formProps, redirect) => async dispatch => {
    try {
        const response = await axios.post(
            'http://localhost:3090/signin',
            formProps
        );
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        redirect();
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error.response.data.error });
    }
};

export const signout = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH_USER,
        payload: '',
    };
};
