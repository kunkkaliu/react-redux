/**
 * Created by liudonghui on 17/6/8.
 */
import {
    GETFORMDATA_PENDING,
    GETFORMDATA_SUCCESS,
    GETFORMDATA_ERROR,

    SETSTORE_FORM
} from '../actions/form';

const initialState = {
    formData: {},
    error: ''
};

export default function form(state = initialState, action = {}) {
    switch (action.type) {
        case GETFORMDATA_PENDING:
            return Object.assign({}, state, {
                formData: {},
                error: ''
            });
        case GETFORMDATA_SUCCESS:
            if(action.payload.data.code != 0) {
                return Object.assign({}, state, {
                    error: action.payload.message
                });
            }
            let data = action.payload.data.data;
            return Object.assign({}, state, {
                error: '',
                formData: {
                    nickname: {
                        value: (data && data.nickname) || undefined
                    },
                    phone: {
                        value: (data && data.phone) || undefined
                    }
                }
            });
        case GETFORMDATA_ERROR:
            return Object.assign({}, state, {
                error: action.payload.error || action.payload.message
            });
        
        case SETSTORE_FORM:
            return Object.assign({}, state, action.payload.store);
        default:
            return state;
    }
}