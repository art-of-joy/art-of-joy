import {className, innerMainProps, mainProps} from "../../../lib/store/types/props";
import {ReactNode} from "react";

export interface field extends mainProps {
  name?: string
  title?: string
  showTitle?: boolean
  colWidth?: {
    value: number
    unit: 'px' | '%'
  }
  createRecord?(record:Record<string, any>): ReactNode | undefined
  valueMap?: Record<string, ReactNode>
}

export interface tablePropsInterface  extends mainProps {
  dataSource?: string
  emptyMessage?: ReactNode
  fields?: Array<field>
  autoFetch?:boolean
  records?:Array<Record<string, any>>
  classNames?:{
    table?:className
    head?:className
    headRow?:className
    headCell?:className
    headCellText?:className
    body?:className
    row?:className
    cell?:className
    loader?:className
    cellText?:className
    select?:className
    selectSquare?:className
    selectCheckMark?:className
    expansionArrow?:className
    expansionArrowActive?:className
    expansionRow?:className
    expansionElement?:className
    headerSpansRow?:className
    headerSpansCell?:className
    headerSpansFields?:className
    delete?:className
    deleteMark?:className
    pagination?: className
    paginationWrapper?:className
    paginationArrow?:className
    paginationArrowLeft?:className
    paginationArrowRight?:className
  }
  rowClick?(record:Record<string, any>, rowNum:number, colNum:number): void
  cellClick?(record:Record<string, any>, rowNum:number, colNum:number): void
  createRecord?(record:Record<string, any>, fieldName:field, colNum:number): ReactNode | undefined
  createExpansionElement?(record:Record<string, any>): ReactNode | undefined
  loadElem?: ReactNode
  countRowForFetch?: number
  canSelected?:boolean
  selectedAll?:boolean
  selectColNum?:number
  deleteColNum?:number
  canExpansion?:boolean
  expansionColNum?: number
  showHeaders?: boolean
  headerSpans?: { title: string, fields: string[]}[]
  groupByField?: string
  canDelete?:boolean
  canDragRecords?: boolean
  canDropRecords?: boolean
}
export interface innerTablePropsInterface extends tablePropsInterface, innerMainProps {
  currentX?: number
  currentWidth?: number
  isLoading: boolean
  headerSpansIndexes?: number[][]
  changedRowIndex: number | null
  expansionRowsIndexes: number[]
  hiddenRecords?: Record<string, Record<string, any>[]>
  recordsPerPage: 15 | 25 | 50 | 100
  page: number
}