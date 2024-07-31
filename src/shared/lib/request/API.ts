import axios, {AxiosResponse} from "axios";
import {store} from "../store/store";

const responseHandler = (
        response: AxiosResponse<any, any>,
        callBackOk?: (response: Record<string, any>) => void,
        callBackError?: (error: Record<string, any>) => void
    ) => {
    if (response?.data?.errorList !== undefined) {
        if (callBackError) {
            callBackError(response);
        }
    }
    else if (callBackOk) {
        callBackOk(response);
    }
}

const errorHandler = (error: Record<string, any>, callBackError?: (error: Record<string, any>) => void) => {
    console.log(callBackError!== undefined && error !== undefined && error.data !== undefined)
    if(callBackError!== undefined && error !== undefined && error.data !== undefined)
        callBackError(error.data);
}

export const fetch = (
    method: string,
    url: string,
    config?: {params?: Record<string, any>, headers?: Record<string, any>},
    callBackOk?: (response: Record<string, any>) => void,
    callBackError?: (error: Record<string, any>) => void
) => {

    const Token = store.getState().user.token;
    const headers = {...config?.headers, Token}

    switch (method) {
        case 'post':
            axios.post(url, config?.params, { headers: headers })
                .then(response => {
                    responseHandler(response, callBackOk, callBackError);
                })
                .catch(error => {
                   errorHandler(error.response, callBackError);
                });
            break;
        case 'get':
            axios.get(url, config)
                .then(response => {
                    responseHandler(response, callBackOk, callBackError);
                })
                .catch(error => {
                    errorHandler(error.response, callBackError);
                });
            break;
        case 'update':
            axios.put(url, config?.params, { headers: headers })
                .then(response => {
                    responseHandler(response, callBackOk, callBackError);
                })
                .catch(error => {
                    errorHandler(error.response, callBackError);
                });
            break;
        case 'delete':
            axios.delete(url, { headers: headers })
                .then(response => {
                    responseHandler(response, callBackOk, callBackError);
                })
                .catch(error => {
                    errorHandler(error.response, callBackError);
                });
            break;
    }
}