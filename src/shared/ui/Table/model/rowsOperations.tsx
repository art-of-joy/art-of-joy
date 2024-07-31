import {innerTablePropsInterface} from "./types";
import {store} from "../../../lib/store/store";
import {setProps} from "../../../lib/store/slices/uiSlice";
import {ReactNode} from "react";
import React from "react";
import {getClassName} from "../../../lib/helpers/getClassName";
import {tableDefault} from '../model/const'
import {formatColWidth} from "./fieldOperations";

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

export const getRenderedRows = (tableProps: innerTablePropsInterface): ReactNode[] | null => {
    const table = store.getState().ui[tableProps.id!] as innerTablePropsInterface;

    if (!table || !table.records) {
        return null;
    }

    const renderedRows: ReactNode[] = [];
    let i = table.page === 0 ? table.page : (table.page + 1 * table.recordsPerPage) - 1;
    const defaultPage = table.page + 1 * table.recordsPerPage;
    let isForEnd = table.page === 0 ? defaultPage : defaultPage + table.recordsPerPage;
    for (i; i < isForEnd; i++) {

        if (table.records[i]) {
            renderedRows.push(
                <div
                    key={i}
                    className={
                        getClassName(
                            table.classNames?.row?.useDefault!,
                            tableDefault.classNames?.row?.name!,
                            table.classNames?.row?.name!,
                            table.visible
                        )
                    }
                >
                    {getRenderedRowsInner(table, i)}
                </div>
            );
        }
    }

    return renderedRows.length > 0 ? renderedRows : null;
};

export const getRenderedRowsInner = (tableProps: innerTablePropsInterface, rowIndex: number): Array<ReactNode> | null => {
    const table = store.getState().ui[tableProps.id!] as innerTablePropsInterface;
    if (!table.fields)
        return null

    return (
        table.fields.map((field, index) => {

            if(field.createRecord) {
                return field.createRecord(table.records![rowIndex])
            }
            const width = formatColWidth(field);
            const colStyle = {
                ...field.styles,
                maxWidth: width,
                minWidth: width,
            }
            return (
                <div
                    className={
                    getClassName(
                        table.classNames?.cell?.useDefault!,
                        tableDefault.classNames?.cell?.name!,
                        table.classNames?.cell?.name!,
                        table.visible
                    )
                    }
                    key={field.name! + index+ '' + rowIndex}
                    style={colStyle}
                >
                    {table.records![rowIndex][field.name!]}
                </div>
            )
        })
    )
}

export const changePageClickHandler = (e: React.MouseEvent<HTMLElement>, tableProps: innerTablePropsInterface, isIncrement: boolean = true) => {
    if (tableProps.records) {
        let newPage = tableProps.page;
        if (isIncrement) {
            if (
                tableProps.page === 0 ||
                (tableProps.page + 1) * tableProps.recordsPerPage < tableProps.records.length
            ) {
                newPage++;
            }
        } else {
            if (tableProps.page != 0) {
                newPage--;
            }
        }
        newPage != tableProps.page && store.dispatch(setProps({ id: tableProps.id!, key: "page", value: newPage }))
    }
}

