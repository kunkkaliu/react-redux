import api from '../api'

export const GET_ALL_MENU = 'GET_ALL_MENU';
export const GET_ALL_MENU_SUCCESS = 'GET_ALL_MENU_SUCCESS';
export const UPDATE_OPENKEYS = 'UPDATE_OPENKEYS';

export function updateOpenKeys(openKeys) {
    return {
        type: UPDATE_OPENKEYS,
        payload: {
            openKeys: openKeys
        }
    }
}

export function getAllMenu() {
    return {
        type: GET_ALL_MENU,
        payload: {
            promise: api.get('/menu')
        }
    }
}
