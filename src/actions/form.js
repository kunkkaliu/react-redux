/**
 * Created by liudonghui on 17/6/8.
 */
import api from '../api';

export const GETFORMDATA_PENDING = "GETFORMDATA_PENDING";
export const GETFORMDATA_SUCCESS = "GETFORMDATA_SUCCESS";
export const GETFORMDATA_ERROR = "GETFORMDATA_ERROR";

export const SETSTORE_FORM = "SETSTORE_FORM";

export function getFormData() {
    return {
        type: "GETFORMDATA",
        payload: {
            promise: api.get('/form')
        }
    }
}

export function setStore(store) {
    return {
        type: SETSTORE_FORM,
        payload: {
            store: store
        }
    }
}