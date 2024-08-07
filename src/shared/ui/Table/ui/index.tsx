import React, {ReactNode, useCallback, useEffect, useRef, useState} from 'react'
import {tablePropsInterface} from '../model/types'
import { tableDefault } from "../model/const";
import { fetchTableData} from "../model";
import {
  addSelectedField,
  addExpansionField,
  getRenderedFields,
  sortHeaderSpansFields, addDeleteField, getHeaderSpansFieldsWidth
} from "../model/fieldOperations"
import {
  addSelectedKeys,
  addExpansionKeys, getRenderedRows, changePageClickHandler,
} from "../model/rowsOperations";
import {useSelector} from "react-redux";


import {getInnerProps} from "../../../lib/store/utils/assignProps";
import {getResultProps} from "../../../lib/store/utils/getProps";
import {getClassName} from "../../../lib/helpers/getClassName";
import {RootState, store} from "../../../lib/store/store";
import {idGeneration} from "../../../lib/store/utils/idGeneration";
import {innerDataSourceInterface} from "../../DataSource/model/types";
import {createElem} from "../../../lib/store/slices/uiSlice";


export function Table(props: tablePropsInterface)  {

  const [id] = useState(idGeneration(tableDefault.id!));
  const currentTableProps = getInnerProps(tableDefault, props);
  const table = useRef(null);
  const tableHead = useRef(null);
  const tableHeadRow = useRef(null);
  const resultProps = getResultProps("ui", props.id, currentTableProps, id);

  useEffect(() => {
    store.dispatch(createElem(resultProps));
    if(store.getState().ui[resultProps.id!] != undefined) {


      if (resultProps.dataSource) {
        let ds = store.getState().ui[resultProps.dataSource] as innerDataSourceInterface | undefined;
        if (ds) {
          if(resultProps.autoFetch && resultProps.dataSource && !ds.isLoading && !ds.data)
            fetchTableData(resultProps.id!);
        }

      }
      if (resultProps.canExpansion)
        addExpansionField(resultProps);
      if (resultProps.canSelected)
        addSelectedField(resultProps);
      if(resultProps.canDelete)
        addDeleteField(resultProps);

      //Если проходят какие-то манипуляции с полем field, как выше, то функция по сортировки должна находиться ниже по коду
      if (resultProps.headerSpans && resultProps.headerSpans.length > 0)
        sortHeaderSpansFields(resultProps);
    }
  }, []);

  useEffect(() => {
    if(resultProps.canSelected)
      addSelectedKeys(resultProps);
    if(resultProps.canExpansion)
      addExpansionKeys(resultProps);
  }, [resultProps.isLoading]);

  useEffect(() => {
   getHeaderSpansFieldsWidth(resultProps, tableHeadRow);
  });


  const ds  = useSelector((state:RootState) => {
    if(resultProps.dataSource)
      return state.ui[resultProps.dataSource] as innerDataSourceInterface;
  });

  useEffect(() => {
    if (resultProps.dataSource) {
      if (ds) {
        if(resultProps.autoFetch && resultProps.dataSource && !ds.isLoading && !ds.data)
          fetchTableData(resultProps.id!, {}, (response)=> {
            console.log(response.data)
          });
      }
    }
  }, [ds]);

  const fields = getRenderedFields(resultProps);
  const rows = getRenderedRows(resultProps)
  const countRecords = useCallback(
      () => resultProps.page*resultProps.recordsPerPage,
      [resultProps.page,  resultProps.recordsPerPage]);
  const endRecords = useCallback((): number => {
    const result =  countRecords() + resultProps.recordsPerPage;

    if (resultProps.records) {
        if (resultProps.records.length > result) {
          return result
        } else {
          return  resultProps.records.length
        }
    }
      return result
  }, [countRecords, resultProps.recordsPerPage, resultProps.page]);

  return (
    <div
      data-id={resultProps.id}
      className={getClassName(resultProps.classNames?.table?.useDefault!, tableDefault.classNames?.table?.name!, resultProps.classNames?.table?.name!, resultProps.visible)}
      style={getInnerProps(tableDefault.styles!, resultProps.styles!)}
      ref={table}
      key={resultProps.id+'table'}
      onDragOver={(e) => {
        if (resultProps.canDropRecords)
          e.preventDefault();
      }}
    >
      {resultProps.showHeaders && <div
        className={getClassName(resultProps.classNames?.head?.useDefault!, tableDefault.classNames?.head?.name!, resultProps.classNames?.head?.name!)}
        ref={tableHead}
        key={"tableHeader" + resultProps.id}
      >
        <div
          className={getClassName(resultProps.classNames?.headRow?.useDefault!, tableDefault.classNames?.headRow?.name!, resultProps.classNames?.headRow?.name!)}
          data-elem={'table__head_'+resultProps.id!}
          key={resultProps.id+'tableHeadRow'}
          ref={tableHeadRow}
        >
          {fields && fields}
        </div>
      </div>}
      <div
        className={getClassName(resultProps.classNames?.body?.useDefault!, tableDefault.classNames?.body?.name!, resultProps.classNames?.body?.name!)}
        data-elem={'table__body_'+resultProps.id!}
        key={"tableBody" + resultProps.id}
      >
        {rows && rows}
      </div>
      <div
          className={
            getClassName(
                resultProps.classNames?.pagination?.useDefault!,
                tableDefault.classNames?.pagination?.name!,
                resultProps.classNames?.pagination?.name!
            )
          }
      >
        <div>
          <>
            {countRecords() + 1} - {endRecords()}
          </>
        </div>
        <div className={
          getClassName(
              resultProps.classNames?.paginationWrapper?.useDefault!,
              tableDefault.classNames?.paginationWrapper?.name!,
              resultProps.classNames?.paginationWrapper?.name!)
        }
        >

          <div
              className={
                  getClassName(
                      resultProps.classNames?.paginationArrow?.useDefault!,
                      tableDefault.classNames?.paginationArrow?.name!,
                      resultProps.classNames?.paginationArrow?.name!) + " " +
                  getClassName(
                      resultProps.classNames?.paginationArrowLeft?.useDefault!,
                      tableDefault.classNames?.paginationArrowLeft?.name!,
                      resultProps.classNames?.paginationArrowLeft?.name!
                  )
              }
              onClick={(e) => {
                changePageClickHandler(e, resultProps, false)
              }}
          >

          </div>

          <div
              className={
                getClassName(
                    resultProps.classNames?.paginationArrow?.useDefault!,
                    tableDefault.classNames?.paginationArrow?.name!,
                    resultProps.classNames?.paginationArrow?.name! + '__left')
              }
              onClick={(e) => {
                changePageClickHandler(e, resultProps)
              }}
          ></div>

        </div>
      </div>
    </div>
  )
}
