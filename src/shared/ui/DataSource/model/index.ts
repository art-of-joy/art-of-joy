import {store} from "../../../lib/store/store";
import {fetch} from "../../../lib/request/API";
import {setProperties, setProps} from "../../../lib/store/slices/uiSlice";
import {dataInterface, innerDataSourceInterface, response} from "./types";

export const fetchDataSource = (id:string, params:Record<string, any> = {}, callBackOk: (data:response)=> void = () => {}, callBackError: (data:response)=> void = () => {} , method: "get" | "delete" | "post" | "update" = "get", reload:boolean = false) => {
    store.dispatch(setProps({id, key:"isLoading", value:true}))
    const dataSource = store.getState().ui[id] as innerDataSourceInterface;
    const newParams = {...dataSource.params,...dataSource.temporalParams, ...params}
    fetch(method, dataSource.dataURL!, {params: newParams, headers: dataSource.params?.headers},
        (result: response)=> {
                    if(result) {
                        const responseRecords = result!.data!.records
                        let currentIndex = dataSource.data && dataSource.data.records ? dataSource.data.records.length : 0
                        const records = Array.isArray(responseRecords)
                            ? responseRecords.map((record, index) => ({
                                ...record,
                                index: index + currentIndex,
                            }))
                            : responseRecords;

                        const preparedData:dataInterface = {
                            startRow:result.data?.startRow,
                            endRow: result.data?.endRow,
                            maxRow: result.data?.maxRow,
                            records: records
                        }
                        if(!dataSource.data)
                            store.dispatch(setProps({id, key:"data", value:preparedData}))
                        else{
                            if(reload)
                                store.dispatch(setProperties({id, propsArray:[
                                        {key:"data", value:preparedData},
                                        {key:"reload", value:true}
                                    ]}
                                ))
                            else{
                                store.dispatch(setProps({id, key: 'records', value: preparedData.records!}))
                                store.dispatch(setProps({id, key: 'data.startRow', value: preparedData.startRow!}))
                                store.dispatch(setProps({id, key: 'data.endRow', value: preparedData.endRow!}))
                            }
                        }
                        callBackOk({
                            success: true,
                            data: result!.data
                        })
                    }

                  },
        (result: Record<string, any>)=> {
                        callBackError({
                            errorMessage: result.message,
                            serverCode: result.response?.data.serverCode,
                            serverError: result.response?.data.serverError,
                            errorCode: result.code,
                            success: false
                        })
                    })
}

export const deleteDataSourceData = (id:string, keyField:string, value:any, callBackOk: (data:response)=> void = () => {}, callBackError: (data:response)=> void = () => {}) => {
    const dataSource = store.getState().ui[id] as innerDataSourceInterface;
    if(dataSource.data && dataSource.data.records) {
        const currentRecord = dataSource.data.records.find((curRecord: Record<string, any>) => curRecord[keyField] == value);
        if (currentRecord) {
            fetch("delete",
                         dataSource.dataURL!,
                  {params: currentRecord},
     (result: response) => {
                    const dataSource = store.getState().ui[id] as innerDataSourceInterface;
                    dataSource.data?.records?.filter((record: Record<string, any>) => record[keyField] != value);
                    store.dispatch(setProps({id, key: "data.records", value:newRecords}));
                    callBackOk({
                        success: true,
                        data: result!.data
                    });
                },
    (result: Record<string, any>)=> {
                    callBackError({
                        errorMessage: result.message,
                        serverCode: result.response?.data.serverCode,
                        serverError: result.response?.data.serverError,
                        errorCode: result.code,
                        success: false
                    });
                }
            );
        }
    }
    const newRecords = dataSource.data?.records?.filter((record: Record<string, any>) => record[keyField] != value);
    store.dispatch(setProps({id, key: "data.records", value:newRecords}));
}