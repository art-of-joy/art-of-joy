import {fetch} from "../../shared/lib/request/API";
import {address} from "../../app/config";
import {AUTH_TYPES} from "../../features/acceptCode/model/types";

export const auth = (
    email: string,
    password: string,
    number: string,
    token: string,
    authType: AUTH_TYPES,
    callBackOk:(data: Record<string, any>) => void,
    callBackError:(error: Record<string, any>) => void
) => {
    fetch('post', `${address}/authorization`,
  {
            headers: {
                "Token": token,
                authType,
            },
            params: {
                email,
                password,
                number
            }
        },
        (response)=> {
            callBackOk(response);
        },
        (response) => callBackError(response))
}