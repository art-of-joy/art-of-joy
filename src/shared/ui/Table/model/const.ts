import {innerTablePropsInterface} from './types'
import styles from '../ui/Table.module.scss'
export const tableDefault: innerTablePropsInterface = {
  id: 'table',
  isLoading: false,
  fields: [
    { name: 'Поле 1', styles: {width: '100px'}},
    { name: 'Поле 2'},
    { name: 'Поле 3'}
  ],
  styles: {
    maxHeight: '600px'
  },
  classNames: {
    table:{name:styles.table, useDefault:true},
    head: {name: styles.table__head, useDefault: true},
    headRow: {name: styles["table__head-row"], useDefault: true},
    headCell: {name: styles["table__head-cell"], useDefault: true},
    headCellText: {name: styles["table__head-cell-text"], useDefault: true},
    body: {name: styles.table__body, useDefault: true},
    row: {name: styles.table__row, useDefault: true},
    cell: {name: styles.table__cell, useDefault: true},
    loader: {name: styles.table__loader, useDefault: true},
    cellText: {name: styles["table__cell-text"], useDefault: true},
    select: {name: styles.table__select, useDefault: true},
    selectSquare: {name: styles['table__select-square'], useDefault: true},
    selectCheckMark: {name: styles["table__select-check-mark"], useDefault: true},
    expansionRow: {name: styles["table__expansion-row"], useDefault: true},
    expansionArrow: {name: styles["table__expansion-arrow"], useDefault: true},
    expansionArrowActive: {name: styles["table__expansion-arrow--active"], useDefault: true},
    expansionElement: {name: styles["table__expansion-element"], useDefault: true},
    headerSpansRow: {name: styles['table__header-spans__row'], useDefault: true},
    headerSpansCell: {name: styles['table__header-spans__cell'], useDefault: true},
    headerSpansFields: {name: styles['table__header-spans__fields'], useDefault: true},
    delete:{name:styles.table__delete, useDefault:true},
    deleteMark:{name:styles["table__delete-mark"], useDefault:true},

  },

  selectColNum: 0,
  countRowForFetch: 10,
  selectedAll:false,
  showHeaders: true,
  headerSpans:[],
  changedRowIndex: null,
  expansionRowsIndexes: [],
  canDelete:false,
  canDragRecords: false,
  canDropRecords: false,
  treeGridSortedRecords: false,
  autoFetch: true
}
