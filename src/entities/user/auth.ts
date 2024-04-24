import {fetch} from "../../shared/lib/request/API";
import {address} from "../../app/config";

export const auth = (email: string, password: string, callBackOk:(data: Record<string, any>) => void, callBackError:(error: Record<string, any>) => void) => {
    fetch('post', `${address}/registration`,
        {params: {email}},
        (data)=> {
            callBackOk(data);
        },
        (error)=>{
            callBackError(error);
        })
}