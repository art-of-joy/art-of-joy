import {fetch} from "../../shared/lib/request/API";
import {address} from "../../app/config";

export const category = (
    callBackOk:(data: Record<string, any>) => void,
    callBackError:(error: Record<string, any>) => void
) => {
    fetch('get', `${address}/category`,
        {params: {
            }},
        (data)=> {
            callBackOk(data);
        },
        (error)=>{
            callBackError(error);
        })
}