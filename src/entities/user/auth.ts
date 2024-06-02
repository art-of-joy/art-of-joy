import {fetch} from "../../shared/lib/request/API";
import {address} from "../../app/config";

export const auth = (
    email: string,
    password: string,
    number: string,
    token: string,
    authType: number,
    callBackOk:(data: Record<string, any>) => void,
    callBackError:(error: Record<string, any>) => void
) => {
    fetch('post', `${address}/authorization`,
  {
            headers: {
                "Token": token
            },
            params: {
                email,
                password,
                authType,
                number
            }
        },
        (response)=> {
            callBackOk(response);
        },
        (response)=>{
            callBackError(response);
        })
}