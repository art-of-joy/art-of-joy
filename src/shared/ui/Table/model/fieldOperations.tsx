import {field, innerTablePropsInterface} from "./types";
import {store} from "../../../lib/store/store";
import React, {ReactNode} from "react";
import {getClassName} from "../../../lib/helpers/getClassName";
import {tableDefault} from "./const";
import {isConsecutiveIndexes} from "../../../lib/helpers/isConsecutiveIndexes";
import {setProperties, setProps} from "../../../lib/store/slices/uiSlice";
export const formatColWidth = (field: field) => {
    field = {...field}
    if(field.colWidth) {
        const { value, unit } = field.colWidth;
        switch (unit) {
            case 'px':
                return `${value}px`;
            case '%':
                return `${value}%`;
            default:
                return `100px`;
        }
    }
    else {
        if(field.styles?.flexGrow) {
            return 'auto';
        } else {
            return `100px`;
        }
    }
}

export const setFieldWidth = (id:string, fieldIndex:number, width:number) => {
    const table = store.getState().ui[id] as innerTablePropsInterface;
    const fields = table.fields!.map((field, index) => {
        if (index === fieldIndex) {
            return {
                ...field,
                colWidth: {
                    value: width,
                    unit: 'px'
                }
            };
        }
        return field;
    });

    store.dispatch(setProps({ id, key: 'fields', value: fields }));
}

export const addSelectedField = (props: innerTablePropsInterface) => {
    const table = store.getState().ui[props.id!] as innerTablePropsInterface;

    if (table.fields) {
        const fields = [...table.fields]
        fields.splice(props.selectColNum!, 0, {name: 'enot-select', showTitle: false, styles: {flexGrow: 1}});
        store.dispatch(setProps({id: props.id!, key: 'fields', value: fields}));
    }
}

export const addDeleteField = (props:innerTablePropsInterface) => {
    const table = store.getState().ui[props.id!] as innerTablePropsInterface;
    const fields = table.fields;
    if (fields) {
        fields.splice(props.deleteColNum || props.fields?.length! + 1, 0, {
            name: 'enot-delete',
            showTitle: false,
            styles: {flexGrow: 1}
        });
        store.dispatch(setProps({id: props.id!, key: 'fields', value: fields}));
    }
}

export const addExpansionField = (props: innerTablePropsInterface) => {
    const table = store.getState().ui[props.id!] as innerTablePropsInterface;
    const fields = table.fields;
    if (fields) {
        if (props.expansionColNum == 0 || props.expansionColNum)
            fields.splice(props.expansionColNum, 0, {name: 'enot-expansion', showTitle: false, styles: {flexGrow: 1}});
        else
            fields.push({name: 'enot-expansion', showTitle: false});
        store.dispatch(setProps({id: props.id!, key: 'fields', value: fields}));
    }
}

export const onDragStartHandler = (e: React.DragEvent<HTMLElement>, id: string) =>{
    const rect = e.currentTarget.getBoundingClientRect();
    const isRightSide = e.clientX - rect.right < 10
    if(isRightSide) {
        store.dispatch(setProperties({id,
            propsArray: [
                {key: 'currentX', value: rect.right},
                {key: 'currentWidth', value: rect.width}
            ]
        }));
        e.dataTransfer.setDragImage(new Image(), 0, 0);
    } else {
        e.preventDefault();
    }
}

export const onDragHandler = (e: React.DragEvent<HTMLElement>, props: innerTablePropsInterface, index: number) => {
    const width = props.currentWidth! + (e.clientX - props.currentX!);
    if(width > 0)
        setFieldWidth(props.id!, index, width);
}

export const getRenderedFields = (props: innerTablePropsInterface) => {
    if (props.headerSpans && props.headerSpans.length > 0) {
        return getHeaderSpansLayout(props);
    }
    return props.fields!.map((field, index) => {
        return getFieldLayout(props, index);
    })
}

export const getHeaderSpansLayout = (props: innerTablePropsInterface) => {
    let result: React.JSX.Element[] = [];
    let headerSpanIndex = 0;
    for (let i = 0; i < props.fields!.length;) {
        if (props.headerSpansIndexes && props.headerSpansIndexes[headerSpanIndex] && props.headerSpansIndexes[headerSpanIndex][0] == i) {
            const index = props.headerSpansIndexes[headerSpanIndex];
            let j = index[0];
            let width:string = '';
            let spansFields: React.JSX.Element[] = [];
            for (; j <= index[1]; ) {
                spansFields.push(getFieldLayout(props, j));
                const field = props.fields![j]
                if (j !== index[0]) {
                    width += ' + '
                }
                width += formatColWidth(field);
                j++;
            }
            const headerSpanStyle = {
                minWidth: `calc(${width})`,
                maxWidth: `calc(${width})`
            }
            result.push(
                <div
                    key={'headerSpan_'+i}
                    className={getClassName(tableDefault, props, 'headerSpansRow')}
                    style={headerSpanStyle}
                >
                    <div
                        className={getClassName(tableDefault, props, 'headerSpansCell')}

                    >
                        {props.headerSpans![headerSpanIndex].title}
                    </div>
                    <div
                        className={getClassName(tableDefault, props, 'headerSpansFields')}
                    >
                        {spansFields}
                    </div>
                </div>
            );
            i=j;
            headerSpanIndex++;
        } else {
            result.push(getFieldLayout(props, i));
            i++;
        }
    }
    return result;
}


export const getFieldLayout = (props: innerTablePropsInterface, index: number, useStyles = true): React.JSX.Element => {
    const field = props.fields![index]
    const width = formatColWidth(field);
    const colStyle = {
        ...field.styles,
        maxWidth: width,
        minWidth: width,
    }
    return <div
        style={useStyles ? colStyle : {...field.styles}}
        draggable={true}

        onDragStart={(e) => {
            onDragStartHandler(e, props.id!);
        }}

        onDrag={(e) => {
            onDragHandler(e, props, index);
        }}

        className={getClassName(tableDefault, props, 'headCell')}
        key={"tableField" + props.id + index}
    >
        {getFieldInnerLayout(props, index)}
    </div>
}
export const setAllCheckBoxByName = (id: string, field: field) => {
    const table = store.getState().ui[id] as innerTablePropsInterface;

    if (table.records) {
        const recordKey = field.name ? field.name : field.type!;

        const records = table.records.map(record => {
            const newRecords = {...record}
            newRecords[recordKey] = !field.allCheckbox;
            return newRecords;
        })

        store.dispatch(setProps({id, key: 'records', value: records}));
    }
}

export const getFieldInnerLayout = (props: innerTablePropsInterface, index: number): ReactNode => {

    const field = props.fields![index];
    if (field.type === 'select') {
       return (
           <div
               onClick={ () => {
                   const newFields = props.fields!.map((fieldItem, fieldIndex) => {
                       const newField = {...fieldItem}
                       if (fieldIndex === index) {
                            if (newField.allCheckbox) {
                                newField.allCheckbox = !newField.allCheckbox
                            } else {
                                newField.allCheckbox = true;
                            }
                       }

                       return newField
                   });
                   store.dispatch(setProps({id:props.id!, key:"fields", value:newFields}))
                   setAllCheckBoxByName(props.id!, field);
               }}
               className={getClassName(tableDefault, props , 'select')}
           >
               <div
                   className={getClassName(tableDefault, props , 'selectSquare')}
               >
                   {field.allCheckbox && <div
                       className={getClassName(tableDefault, props , 'selectCheckMark')}
                   >
                   </div>}
               </div>
           </div>
       );
    } else {
        if (field.showTitle == undefined || field.showTitle) {
            if (field.title)
                return <div
                    className={getClassName(tableDefault, props, 'headCellText')}
                >{field.title}</div>
            else
                return <div
                    className={getClassName(tableDefault, props, 'headCellText')}
                >{field.name}</div>
        } else if (!field.showTitle) {
            return <div
                className={getClassName(tableDefault, props, 'headCellText')}
            ></div>
        }
    }
}



export const sortHeaderSpansFields = (props: innerTablePropsInterface) => {
    props = store.getState().ui[props.id!] as innerTablePropsInterface;
    const defaultFields: field[] = [...props.fields!];
    let startSpanIndex:number = props.fields!.length;
    const spanIndexes: number[][] = [];
    props.headerSpans!.forEach((span) => {
        const sortedFields: field[] = [];
        const spanFieldIndexes: number[] = [];
        let lowerSpanFieldIndex: number = props.fields!.length;
        let maxSpanFieldIndex: number = 0;
        span.fields.forEach((fieldName, fieldIndex) => {
            const field = props.fields!.find((f) => f.name === fieldName);
            const currentSpanFieldIndex = props.fields!.findIndex((f) => f.name === fieldName);
            if (field) {
                if (currentSpanFieldIndex < lowerSpanFieldIndex) {
                    lowerSpanFieldIndex = currentSpanFieldIndex;
                }
                if (currentSpanFieldIndex > maxSpanFieldIndex) {
                    maxSpanFieldIndex = currentSpanFieldIndex;
                }
                if (fieldIndex == span.fields.length-1) {
                    startSpanIndex = lowerSpanFieldIndex;
                }
                spanFieldIndexes.push(currentSpanFieldIndex);
                sortedFields.push(field);
            }
        });
        const sortedFieldIndexes = spanFieldIndexes.sort((a, b) => a - b);
        const isConsecutiveArray = isConsecutiveIndexes(sortedFieldIndexes);
        if (isConsecutiveArray) {
            defaultFields.splice(startSpanIndex,  sortedFields.length, ...sortedFields);
            spanIndexes.push([lowerSpanFieldIndex, maxSpanFieldIndex]);
        } else {
            const middleFieldIndex = Math.floor((maxSpanFieldIndex + lowerSpanFieldIndex)/2);
            let countBeforeStartFields: number = 0;
            for (let i = lowerSpanFieldIndex; i < maxSpanFieldIndex+1; i++) {
                if(!sortedFieldIndexes.includes(i)) {
                    if (i > middleFieldIndex) {
                        sortedFields.push(props.fields![i]);
                        maxSpanFieldIndex--;
                    }
                    else {
                        defaultFields.splice(startSpanIndex, 0, props.fields![i]);
                        startSpanIndex++;
                        countBeforeStartFields++;
                        lowerSpanFieldIndex++;
                    }
                }
            }
            defaultFields.splice(startSpanIndex,  sortedFields.length+countBeforeStartFields, ...sortedFields);
            spanIndexes.push([lowerSpanFieldIndex, maxSpanFieldIndex]);
        }
    });
    store.dispatch(setProps({id: props.id!, key: 'headerSpansIndexes', value: spanIndexes}));
    store.dispatch(setProps({id: props.id!, key: 'fields', value: defaultFields}));
}


export const getHeaderSpansFieldsWidth = (props: innerTablePropsInterface, tableHeadRow: React.MutableRefObject<null>) => {
    if(props.headerSpans && props.headerSpansIndexes) {
        if (tableHeadRow.current) {
            const DOMHead = tableHeadRow.current as HTMLElement;
            const headWidth = DOMHead.clientWidth;
            let headerSpanIndex = 0;
            for (let i = 0; i < DOMHead.children.length; i++) {
                if (i === props.headerSpansIndexes[headerSpanIndex][0]) {
                    for (let j = 0; j < props.headerSpansIndexes[headerSpanIndex][1]; j++) {
                        if (props.fields && props.fields[j] && props.fields[j].colWidth && props.fields[j].colWidth!.unit == '%') {
                            const resultWidth = headWidth * (props.fields[j].colWidth!.value/100);
                            setFieldWidth(props.id!, j, resultWidth)
                        }
                    }
                    headerSpanIndex++;
                }

            }
        }
    }


}


export const getFieldWidths = (container: Element) => {
    const totalRowCount = container.childElementCount;
    const fieldWidths: number[] = [];
    for (let i = 0; i < totalRowCount; i++) {
        if (container.children[i]) {
            const field = container.children[i] as HTMLElement;
            fieldWidths.push(field.getBoundingClientRect().width);
        }
    }
    return fieldWidths;
}

export const calculateWidths = (props: innerTablePropsInterface, body: Element | null) => {
    const table = store.getState().ui[props.id!] as innerTablePropsInterface;
    const newFields = [...table.fields!];
    if (body) {
        const widths: number[] = getFieldWidths(body);
        newFields.forEach((field, index) => {
            setFieldWidth(props.id!,  index, widths[index]);
        })
    }
}
