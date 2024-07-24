import {innerTablePropsInterface} from "./types";
import {innerDataSourceInterface, response} from "../../DataSource/model/types";
import {deleteDataSourceData, fetchDataSource} from "../../DataSource/model";
import {store} from "../../../lib/store/store";
import {showError} from "../../../lib/helpers/errorHandler";
import {fetch} from "../../../lib/request/API";
import {setProperties, setProps} from "../../../lib/store/slices/uiSlice";

export function addTableData(id: string, data: Record<string, any> | Array<Record<string, any>>, callBack: (data:response) => void = () => {}): void {
    const table = store.getState().ui[id] as innerTablePropsInterface;
    const dataSource = table.dataSource;
    if (dataSource) {
        const dataUrl = (store.getState().ui[dataSource] as innerDataSourceInterface).dataURL;
        if(dataUrl)
            fetch("post", dataUrl, {params: {records: data}}, () => {
                if(Array.isArray(data))
                    store.dispatch(setProps({id, value:data, key: 'records'}))
                else
                    store.dispatch(setProps({id, value:[data], key: 'records'}))
                callBack({
                    success: true
                })
            }, (result)=>{
                callBack({
                    errorMessage: result.message,
                    errorCode: result.code,
                    serverCode: result.response?.data.serverCode,
                    serverError: result.response?.data.serverError,
                    success: false
                })
            });
        else
            showError("Нет поля dataUrl в dataSource")
    }else
        showError("Нет поля datasource в Table")
}

export function addTableRecords(id:string, data: Record<string, any> | Array<Record<string, any>>) {
    const massiveFromData:Array<Record<string, any>> = Array.isArray(data) ? data : [data]
    store.dispatch(setProps({id, value:massiveFromData, key: 'records'}))
    store.dispatch(setProperties({id, propsArray: [
            {key:"isCalculated", value:true},
            {key: 'calculateRows', value: {start: 0, end: 10}}
        ]}))
}

export const fetchTableData = (id:string, params:Record<string, any> = {}, callBack: (data:response) => void = () => {}, reload:boolean  = false) => {
    store.dispatch(setProps({id, key: "isLoading", value: true}))
    let table = store.getState().ui[id] as innerTablePropsInterface;
    if(table.dataSource){
        const dataSource = (store.getState().ui[table.dataSource] as innerDataSourceInterface);
        fetchDataSource(dataSource.id, params, (response ) => {
            store.dispatch(setProps({id, key: "isLoading", value: false}))
            callBack(response)
        }, () => {}, "get", reload)

    }else
        showError("Не найдено поле DataSource в таблице")

}



export const getTableRecords = (id:string): Array<Record<string, any>> => {
    const table = store.getState().ui[id] as innerTablePropsInterface;
    return table.records || []
}

export const getTableSelectedRows = (id:string) => {
    let records: Array<Record<string, any>> = []
    const table = store.getState().ui[id] as innerTablePropsInterface;
    table.records?.forEach(record => {
        if(record.selected)
            records.push(record)
    })
    return records
}