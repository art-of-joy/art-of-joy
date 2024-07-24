import {store} from "../../../../lib/store/store";
import {deleteDataSourceData, fetchDataSource} from "../index";
import {response} from "../types";
import {setProps, updateProps} from "../../../../lib/store/slices/uiSlice";
import {dataSourceInterface, innerDataSourceInterface} from "../types";

export const getRecords = <T = Record<string, any>>(id:string) => {
    const ds = store.getState().ui?.id as innerDataSourceInterface;
    return ds.data?.records as Array<T>
}

export const fetchData = (id:string, params:Record<string, any> = {}, callBacK: (data:response)=> void = () => {}, method: "get" | "delete" | "post" | "update" = "get", reload:boolean = true) => {
    const ds = store.getState().ui?.id as innerDataSourceInterface;
    if(Object.keys(params).length != 0)
        store.dispatch(setProps({id, key:"temporalParams", value:params}))
    else if(ds.temporalParams && Object.keys(params).length == 0 && Object.keys( ds.temporalParams )!.length != 0)
        store.dispatch(setProps({id, key:"temporalParams", value:{} }))

    // fetchDataSource(id,params,callBacK, method, reload)
}

export const setData = (id:string, data:Array<Record<string, any>>) => {
    store.dispatch(setProps({id, key: 'records', value: data }))
}

export const deleteData = (id:string, keyField:string, value:any, callBack: (data:response)=> void = () => {}) => deleteDataSourceData(id, keyField, value, callBack)