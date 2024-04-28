import {fetch} from "../../shared/lib/request/API";
import {address} from "../../app/config";

export const auth = (
    email: string,
    password: string,
    number: string,
    authType: number,
    callBackOk:(data: Record<string, any>) => void,
    callBackError:(error: Record<string, any>) => void
) => {
    fetch('post', `${address}/authorization`,
  {params: {
            email,
            password,
            authType,
            number
        }},
        (data)=> {
            callBackOk(data);
        },
        (error)=>{
            callBackError(error);
        })
}