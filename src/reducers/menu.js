import {
    GET_ALL_MENU_SUCCESS,
    UPDATE_OPENKEYS
} from '../actions/menu';

const initialState = {
    items: [],
    openKeys: []
};

export default function menu(state = initialState, action = {}) {
    switch (action.type) {
        case GET_ALL_MENU_SUCCESS:
            return Object.assign({}, state, {
                items: action.payload.data.menus
            });
        case UPDATE_OPENKEYS:
            return Object.assign({}, state, {
                openKeys: action.payload.openKeys
            });
        default:
            return state;
    }
}
