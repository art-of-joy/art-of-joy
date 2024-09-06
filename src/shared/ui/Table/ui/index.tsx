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
  addKeysByFieldType, getRenderedRows, changePageClickHandler,
} from "../model/rowsOperations";
import {useSelector} from "react-redux";


import {getInnerProps} from "../../../lib/store/utils/assignProps";
import {getResultProps} from "../../../lib/store/utils/getProps";
import {getClassName} from "../../../lib/helpers/getClassName";
import {RootState, store} from "../../../lib/store/store";
import {idGeneration} from "../../../lib/store/utils/idGeneration";
import {innerDataSourceInterface} from "../../DataSource/model/types";
import {createElem, setProps} from "../../../lib/store/slices/uiSlice";


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



  const records = useCallback(() => {
    let result = resultProps.records;

    resultProps.fields!.forEach((field) => {
      if (field.type) {
        result = addKeysByFieldType(resultProps, field);
      }
    });

    return result;
  }, [resultProps.isLoading]);

  useEffect(() => {
    const newRecords = records();

    if (Array.isArray(newRecords)) {
      store.dispatch(setProps({ id: resultProps.id!, key: "records", value: newRecords }));
    }
  }, [records]);

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


 const getClassNames = useCallback((key: string): string => {
   return getClassName(tableDefault, resultProps, key, resultProps.visible)
 }, [tableDefault, resultProps])

  return (
    <div
      data-id={resultProps.id}
      className={getClassNames('table')}
      style={getInnerProps(tableDefault.styles!, resultProps.styles!)}
      ref={table}
      key={resultProps.id+'table'}
      onDragOver={(e) => {
        if (resultProps.canDropRecords)
          e.preventDefault();
      }}
    >
      {resultProps.showHeaders && <div
        className={getClassNames('head')}
        ref={tableHead}
        key={"tableHeader" + resultProps.id}
      >
        <div
          className={getClassNames('headRow')}
          data-elem={'table__head_'+resultProps.id!}
          key={resultProps.id+'tableHeadRow'}
          ref={tableHeadRow}
        >
          {fields && fields}
        </div>
      </div>}
      <div
        className={getClassNames('body')}
        data-elem={'table__body_'+resultProps.id!}
        key={"tableBody" + resultProps.id}
      >
        {rows && rows}
      </div>
      <div
          className={
            getClassNames('pagination')
          }
      >

        <div className={
          getClassNames('paginationWrapper')
        }
        >
          <div
            className={getClassNames('countOfPages')}
          >
            <>
              {countRecords() + 1} - {endRecords()}
            </>
          </div>
          <div
              className={
                  getClassNames('paginationArrow') + " " +
                  getClassNames('paginationArrowLeft')
              }
              onClick={(e) => {
                changePageClickHandler(e, resultProps, false)
              }}
          >
          </div>
          <div
              className={
                  getClassNames('paginationArrow') + "__left"
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
