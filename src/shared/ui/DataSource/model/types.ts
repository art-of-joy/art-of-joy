export interface dataInterface {
    records?: Array<Record<string, any>>
    endRow?:number
    startRow?:number
    maxRow?:number
}

export interface response {
    headers?: Record<string, any>
    errorCode?:number
    errorMessage?:string
    serverCode?:string
    serverError?:string
    data?:dataInterface
    success?:boolean
}
export interface dataSourceInterface {
    id: string,
    data?: dataInterface
    dataURL?: string
    params?:Record<string, any>
    method?:"get" | "delete" | "post" | "update"
}

export interface innerDataSourceInterface extends dataSourceInterface{
    isLoading?:boolean,
    temporalParams:Record<string, any>,
    reload?:boolean
}