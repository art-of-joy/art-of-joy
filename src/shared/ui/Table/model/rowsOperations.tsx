import {innerTablePropsInterface} from "./types";
import {store} from "../../../lib/store/store";
import {setProps} from "../../../lib/store/slices/uiSlice";


export const addSelectedKeys = (table: innerTablePropsInterface) => {
    table = store.getState().ui[table.id!] as innerTablePropsInterface
    if (table.canSelected) {
        let data = table.records;
        if(data){
            const copyData:Array<Record<string, any>> = data?.map(record => {
                const modifiedRecord = { ...record };
                if(!modifiedRecord['selected'])
                    modifiedRecord["selected"] = false;
                return modifiedRecord;
            })
            store.dispatch(setProps({id:table.id!, key:"records", value:copyData}))
        }
    }
}
export const addExpansionKeys = (table: innerTablePropsInterface) => {
    table = store.getState().ui[table.id!] as innerTablePropsInterface
    if (table.canExpansion) {
        let data = table.records;
        if (data) {
            const copyData:Array<Record<string, any>> = data.map(record => {
                const modifiedRecord = { ...record };
                if(!modifiedRecord['expansion'])
                    modifiedRecord["expansion"] = false;
                return modifiedRecord;
            })
            store.dispatch(setProps({id:table.id!, key:"records", value:copyData}))
        }
    }
}

export const setSelect = (id:string, record:Record<string, any>) => {
    const table= store.getState().ui[id] as innerTablePropsInterface;
    const records = [...table.records!];
    records[record.index].selected = !record.selected;
    store.dispatch(setProps({id:table.id!, key:"records", value:records}));
}

export const setExpansion = (id:string, record:Record<string, any>) => {

    const table= store.getState().ui[id] as innerTablePropsInterface;
    const records = [...table.records!];
    records[record.index].expansion = !record.expansion;
    store.dispatch(setProps({id:table.id!, key:"records", value:records}));
    store.dispatch(setProps({id, key: 'changedRowIndex', value: record.index}));

    const newArray = [... table.expansionRowsIndexes];
    if(record.expansion) {
        newArray.splice(record.index, 1);
    } else {
        newArray.push(record.index);
    }
    store.dispatch(setProps({id, key: 'expansionRowsIndexes', value: newArray}));
}

export const rowClickHandler = (e: React.MouseEvent<HTMLElement>, tableProps: innerTablePropsInterface, index:number) => {
    const row: number = parseInt(e.currentTarget.dataset.rownum!);
    const col:HTMLElement = e.target as HTMLElement;
    const cell = col.closest('[data-colnum]');
    let colNum = null;
    if (cell) {
        // Получаем значение атрибута data-colnum ячейки
        const dataColnum = cell.getAttribute('data-colnum')!;
        colNum = parseInt(dataColnum);
    }
    if(tableProps.rowClick)
        tableProps.rowClick(tableProps.records![index]!, row, colNum!);
}

