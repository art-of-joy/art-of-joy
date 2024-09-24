import React, {useCallback, useEffect, useState} from "react";
import {idGeneration} from "../../../lib/store/utils/idGeneration"
import {getInnerProps} from "../../../lib/store/utils/assignProps";
import {getResultProps} from "../../../lib/store/utils/getProps";
import {defaultHint} from "../model/const";
import {hintInterface} from "../model/types";
import {getClassName} from "../../../lib/helpers/getClassName"
import {store} from "../../../lib/store/store"
import {createElem} from "../../../lib/store/slices/uiSlice";

export const Hint = (props:hintInterface) => {

    const [id] = useState(idGeneration(defaultHint.id!));

    const currentProps = getInnerProps(defaultHint, props)

    const resultProps = getResultProps('ui', props.id, currentProps, id);

    useEffect(() => {
        store.dispatch(createElem(resultProps))
    })

    const  getClassNameByKey = useCallback((key: string) => {
        // console.log({resultProps, defaultHint, key, className: resultProps.className[key].name })
        return getClassName(defaultHint, resultProps, key)
    }, [defaultHint, resultProps])

    return(
        <div
            data-id={resultProps.id}
            key={resultProps.id}
            style={{...resultProps.classNames?.hintWrapper!.style, ...resultProps.styles}}
            className={
                (resultProps.hintIcon ? '' : getClassNameByKey('hintIcon')) + " " +
                (resultProps.status == 'warning' && getClassNameByKey('warningIcon')) + " " +
                (resultProps.status == 'info' && getClassNameByKey('infoIcon')) + " " +
                (resultProps.status == 'error' && getClassNameByKey('errorIcon')) + " " +
                (resultProps.status == 'ok' && getClassNameByKey('okIcon'))
            }
        >
            {resultProps.hintIcon}
            <div
                className={getClassNameByKey('hintInner')}
                style={resultProps.classNames?.hintInner?.style}
            >
                {resultProps.hintInner}
            </div>
        </div>
    )
}