import {
    addTableData,
    addTableRecords,
    fetchTableData,
    getTableRecords,
    getTableSelectedRows
} from "../index";
import {innerDataSourceInterface, response} from "../../../DataSource/model/types";
import {innerTablePropsInterface, tablePropsInterface} from "../types";
import {store} from "../../../../lib/store/store";
import {setProps} from "../../../../lib/store/slices/uiSlice";
import {showError} from "../../../../lib/helpers/errorHandler";
/**
 * Устанавливает свойство в таблице с указанным идентификатором
 * @param {string} id - идентификатор
 * @param {string} key - ключ объекта таблицы, название свойства, которое нужно поменять
 * @param value - значение, на которое будет заменено текущее, имеет тип any, так как значение зависит от ключа
 */
export const setTableProps = (id: string, key: keyof tablePropsInterface, value: any) => store.dispatch(setProps({id, key, value}));

/**
 *
 * @param {string} id - идентификатор элемента
 * @param {Record<string, any>} params - параметры запроса
 * @param {void} callBack - функция в которою возвращается результат запроса на сервер, можно выполнять какие либо действия после запроса
 * @returns {void} - обновит состояние и вернет данные в callBack
 *
 * @example
 * tableModel.fetchData("tableId", { endRow:30,startRow:1 }, (response) => {console.log(response.data)})
 */
export const fetchData = ( id:string, params:Record<string, any> = {}, callBack: (data:response) => void = () => {}, reload:boolean = true) => {
    const table = store.getState().ui?.id as innerTablePropsInterface;
    if(table.dataSource){
        const ds = store.getState().ui?.id as innerDataSourceInterface;
        if(Object.keys(params).length != 0 )
            store.dispatch(setProps({id:ds.id, key:"temporalParams", value:params}))
        else if(ds.temporalParams && Object.keys(params).length == 0 && Object.keys(ds.temporalParams ).length != 0)
            store.dispatch(setProps({id:ds.id, key:"temporalParams", value:{} }))

        fetchTableData(id, params ,callBack,  reload)
    }else
        showError("поле dataSource не найдено в таблице")

}

/**
 *
 * @param {string} id - идентификатор элемента
 * @param {Record<string, any> | Array<Record<string, any>>} data - массив объектов или 1 объект
 * @param {void} callBack - функция в которою возвращается результат запроса на сервер, можно выполнять какие либо действия после запроса
 * @returns {Array<Record<string, any>>} - обновляет состояние
 *
 * @example
 * tableModel.addData("tableId", {name:"Ivan", age:5})
 */
export const addData = (id:string, data: Record<string, any> | Array<Record<string, any>>, callBack: (data:response) => void = () => {}):void => addTableData(id, data, callBack)

export const addRecords = (id:string, data: Record<string, any> | Array<Record<string, any>>) => addTableRecords(id, data)


/**
 *
 * @param {string} id - идентификатор элемента
 * @returns {Array<Record<string, any>>} - вернет массив элементов(массив объектов) из таблицы
 *
 * @example
 * tableModel.gerRecords("tableId")
 */
export const getRecords = (id:string) => getTableRecords(id)

/**
 *
 * @param {string} id - идентификатор элемента
 * @returns {Array<Record<string, any>>} - вернет массив выбранных элементов списка(Массив объектов) даже если элемент 1
 *
 * @example
 * tableModel.getSelectedRows("tableId")
 */
export const getSelectedRows = (id:string) => getTableSelectedRows(id)