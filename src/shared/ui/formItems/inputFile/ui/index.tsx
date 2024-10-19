import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {inputFileInterface} from "../model/types";
import {defaultInputFile} from "../model/const";
import {store} from "../../../../lib/store/store";
import {idGeneration} from "../../../../lib/store/utils/idGeneration";
import {getInnerProps} from "../../../../lib/store/utils/assignProps";
import {getResultProps} from "../../../../lib/store/utils/getProps";
import {getClassName} from "../../../../lib/helpers/getClassName";
import {createElem, setProps} from "../../../../lib/store/slices/uiSlice";

export const InputFile:React.FC<inputFileInterface> = (props) => {

    const [id] = useState(idGeneration(defaultInputFile.id!));
    let inputFileProps = useMemo(() => getInnerProps(defaultInputFile, props), [props]);

    const resultProps = getResultProps("ui", props.id, inputFileProps, id);



    const getClassNameByKey = useCallback((key: string) => {
        return getClassName(defaultInputFile, resultProps, key)
    }, [resultProps, defaultInputFile])

    useEffect(() => {
        store.dispatch(createElem(resultProps));
    }, []);

    useEffect(() => {
        if (resultProps.onChangeInput) {
            resultProps.onChangeInput(resultProps.value);
        }
    }, [resultProps.value]);


    return (
        <div
            data-slice={'inputFileSlice'}
            data-id={resultProps.id}
            className={getClassNameByKey('inputWrapper')}
            style={resultProps.styles}
        >
            <input
                id={'file_' + resultProps.id}
                type={"file"}
                className={getClassNameByKey('input')}
                multiple={true}
                draggable={true}
                onDragStart={(e)=> {
                    e.preventDefault();
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    store.dispatch(setProps({id: resultProps.id!, key: 'isDragging', value: true}));
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    store.dispatch(setProps({id: resultProps.id!, key: 'isDragging', value: false}));
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        store.dispatch(setProps({id: resultProps.id!, key: 'isDragging', value: false}));
                        store.dispatch(setProps({id: resultProps.id!, key: 'value', value: e.dataTransfer.files}));
                    }
                }}
                onChange={(e) => {
                    store.dispatch(setProps({id: resultProps.id!, key: 'value', value: e.target.files}));
                }}
            />
            <label
                htmlFor={'file_' + resultProps.id}
                className={getClassNameByKey('label') + ' ' + (resultProps.isDragging ? getClassNameByKey('inputActive') : '')}
            >

                {
                    (resultProps.children &&
                            React.Children.toArray(resultProps.children)
                                .map((child, index) => (
                                    <React.Fragment key={"childWrapperFile" + resultProps.id + index}>{child}</React.Fragment>
                                ))
                        )
                }
                {
                    (!resultProps.children &&
                        (
                            resultProps.value == undefined ?
                                (resultProps.isDragging ? <div>Отпустите файлы, чтоб загрузить их</div> : <div>Перетащите файлы, чтоб загрузить их</div>)
                                    : Array.from(resultProps.value).map((file, index) => {
                                        return <div style={{padding: '10px 0'}} key={'fileName'+index}>Имя выбранного файла: {file.name}</div>
                                    })
                        )
                    )
                }
            </label>
        </div>
    );
};

