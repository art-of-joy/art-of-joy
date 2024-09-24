import React, {useEffect, ChangeEvent, useState, CSSProperties, useCallback} from "react";
import { inputTextPropsInterface } from "../model/types";
import {createElem, setProps} from '../../../../lib/store/slices/uiSlice'
import {store} from "../../../../lib/store/store"
import {defaultInputText} from "../model/const"
import {getInnerProps} from "../../../../lib/store/utils/assignProps";
import {getClassName} from "../../../../lib/helpers/getClassName";
import {getResultProps} from "../../../../lib/store/utils/getProps";
import {idGeneration} from "../../../../lib/store/utils/idGeneration";
import {validate} from "../model/api/InputTextUtils";
import {checkInnerHint, getHintElement} from "../../hint";

export const InputText:React.FC<inputTextPropsInterface>= (props) => {

    const [id] = useState(idGeneration(defaultInputText.id!));

    let inputProps = getInnerProps(defaultInputText, props)

    useEffect(() => {
        store.dispatch(createElem(inputProps));
        if(resultProps.value == '' || resultProps.value == undefined)
            store.dispatch(setProps({id: resultProps.id!, key: 'isFocused', value: false}));
        else {
            store.dispatch(setProps({id: resultProps.id!, key: 'isFocused', value: true}));
        }
    }, []);

    const resultProps = getResultProps('ui', props.id, inputProps, id);

    useEffect(() => {
        if(resultProps.value == '' || resultProps.value == undefined)
            store.dispatch(setProps({id: resultProps.id!, key: 'isFocused', value: false}));
        else {
            store.dispatch(setProps({id: resultProps.id!, key: 'isFocused', value: true}));
        }
    }, [resultProps.value]);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(resultProps.onChange)
            resultProps.onChange(e.target.value, String(resultProps.value) || "", resultProps.name);
        store.dispatch(setProps({ id: resultProps.id!, key: 'value', value: e.target.value }));
        if(resultProps.autoValidate)
            validate(resultProps.id!);
    }

    const keyDownHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {
        resultProps.keyPress && resultProps.keyPress(e.currentTarget.value, String(resultProps.value) || "", e.key)
        store.dispatch(setProps({ id: resultProps.id!, key: 'value', value: e.currentTarget.value }));
    }

    const onExitHandler = (e:React.FocusEvent<HTMLInputElement, Element>) => {
        if(resultProps.onExit)
            resultProps.onExit(e.target.value, String(resultProps.value) || "")

        store.dispatch(setProps({ id: resultProps.id!, key: 'value', value: e.target.value }));

        if(resultProps.value == '' || resultProps.value == undefined)
            store.dispatch(setProps({id: resultProps.id!, key: 'isFocused', value: false}));
        else {
            store.dispatch(setProps({id: resultProps.id!, key: 'isFocused', value: true}));
        }
    }
    const onFocusHandler = (e:React.FocusEvent<HTMLInputElement, Element>) => {
        if (resultProps.canEdit)
            store.dispatch(setProps({id: resultProps.id!, key: 'isFocused', value: true}));
    }

    const alignOptions: Record<string, CSSProperties> = {
        top: { display: 'flex', flexDirection: 'column' },
        bottom: { display: 'flex', flexDirection: 'column-reverse' },
        left: { display: 'flex', flexDirection: 'row' },
        right: { display: 'flex', flexDirection: 'row-reverse' }
    };

    const titleAlign: CSSProperties = resultProps.titleAlign ? alignOptions[resultProps.titleAlign] : {display: 'flex', width: '100%'};

    useEffect(()=> {
        checkInnerHint(resultProps);
    }, [resultProps.invalidValidatorsIndexes]);

    const getClassNamesByKey = useCallback((key: string) => {
        return getClassName(defaultInputText, resultProps, key, resultProps.visible)
    }, [resultProps, defaultInputText])

    return (
        <div
            className={getClassNamesByKey('hintWrapper')}
            style={resultProps.classNames?.hintWrapper?.style}
        >
            { resultProps.invalidValidatorsIndexes && resultProps.invalidValidatorsIndexes.length !== 0 ? getHintElement(resultProps) : ''}
            <div
                className={
                    getClassNamesByKey('inputWrapper')  + ' ' +
                    (resultProps.value ? '' : getClassNamesByKey('empty'))
                }
                style={{...titleAlign,...resultProps.classNames?.inputWrapper?.style}}
            >
                <label
                    className={
                        getClassNamesByKey('title') + ' ' +
                        (resultProps.isFocused ? getClassNamesByKey('titleActive') : '')
                    }
                    htmlFor={resultProps.id}
                    style={resultProps.classNames?.title?.style}
                >
                    {resultProps.title}
                </label>
                <input
                    type={resultProps.isPassword ? 'password' : 'text'}
                    data-id={resultProps.id}
                    id={resultProps.id}
                    key={resultProps.id}
                    className={ getClassNamesByKey('input')}
                    name={resultProps.name}
                    placeholder={resultProps.title ? "" : resultProps.placeholder}
                    value={String(resultProps.value)}
                    onKeyDown={(e) => keyDownHandler(e)}
                    onChange={(e) => changeHandler(e)}
                    onBlur={(e) => onExitHandler(e)}
                    onFocus={(e) => { onFocusHandler(e)}}
                    style={resultProps.classNames?.input?.style}
                    readOnly={!resultProps.canEdit}
                />
            </div>
        </div>
    )
}