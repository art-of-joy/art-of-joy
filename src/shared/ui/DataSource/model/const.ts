import {innerDataSourceInterface} from "./types";

export const defaultDataSource: innerDataSourceInterface = {
    id:"dataSource",
    isLoading:false,
    method:"get",
    temporalParams:{},
    reload: false
}