import React from "react";
import {innerTablePropsInterface} from "./types";
import {setExpansion, setSelect} from "./rowsOperations";

export const cellClickHandler = (e: React.MouseEvent<HTMLElement>, tableProps:innerTablePropsInterface, index:number) => {
    const rowElement = e.currentTarget.parentNode as HTMLElement
    const row: number = parseInt(rowElement.dataset.rownum!);
    const col:HTMLElement = e.currentTarget as HTMLElement;
    if(tableProps.cellClick)
        tableProps.cellClick(tableProps.records![index]!, row, parseInt(col.dataset.colnum!) );

    if(tableProps.selectColNum == parseInt(col.dataset.colnum!) && tableProps.canSelected) {
        setSelect(tableProps.id!, tableProps.records![index]! )
    }
    if(tableProps.canExpansion) {
        if(tableProps.fields?.length! - 1 == parseInt(col.dataset.colnum!)) {
            setExpansion(tableProps.id!, tableProps.records![index]!);
        } else if (tableProps.expansionColNum == parseInt(col.dataset.colnum!)) {
            setExpansion(tableProps.id!, tableProps.records![index]!);
        }

    }
}