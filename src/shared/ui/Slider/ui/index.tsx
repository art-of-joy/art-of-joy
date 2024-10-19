import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {SliderProps} from "../model/types";
import {getClassName} from "../../../lib/helpers/getClassName";
import {idGeneration} from "../../../lib/store/utils/idGeneration";
import {defaultSliderProps} from "../model/const";
import {getInnerProps} from "../../../lib/store/utils/assignProps";
import {getResultProps} from "../../../lib/store/utils/getProps";
import {store} from "../../../lib/store/store";
import {createElem, setProps} from "../../../lib/store/slices/uiSlice";

export const Slider: React.FC<SliderProps> = (props) => {

    const [id] = useState(idGeneration(defaultSliderProps.id!));
    const currentSliderProps = getInnerProps(defaultSliderProps, props);
    const resultProps = getResultProps("ui", props.id, currentSliderProps, id);
    const count = useMemo(() => resultProps.children?.length ?? 0, [resultProps.children]);
    let current =useMemo(() => resultProps.currentChildren ?? 0, [resultProps.currentChildren]);
    const getClassNameByKey = useCallback((key: string) => {
        return getClassName(defaultSliderProps, resultProps, key)
    }, [])

    const arrowClick = (direction: 'left'| 'right') => {
        if (direction === 'right') {
            if (current !== resultProps.children?.length! - 1) {
                const newCurrent = current + 1
                store.dispatch(setProps({id: resultProps.id!, key: 'currentChildren', value: newCurrent}))
            } else {
                    store.dispatch(setProps({ id: resultProps.id!, key: 'currentChildren', value: 0}))
                }
        } else {
            if (current !== 0) {
                const newCurrent = current-1
                store.dispatch(setProps({ id: resultProps.id!, key: 'currentChildren', value: newCurrent}))
            } else {
                const newCurrent = count-1
                store.dispatch(setProps({ id: resultProps.id!, key: 'currentChildren', value: newCurrent}))
            }

        }
    }
    const dotClick = (newCurrent: number) => {
        store.dispatch(setProps({ id: resultProps.id!, key: 'currentChildren', value: newCurrent}))
    }
    if (!resultProps.children) {
        return null
    }

    useEffect(() => {
        store.dispatch(createElem(resultProps))
    })

    return (
        <React.Fragment>
            <div
                className={getClassNameByKey('wrapper')}
            >
                <div
                    className={getClassNameByKey('wrapperOverflow')}
                >
                    <div
                        className={getClassNameByKey('wrapperInner')}
                        style={
                            {
                                width: `${resultProps.children.length * 100}%`,
                                transform: `translateX(-${current !== 0 ? current * (100 / count) : 0}%)`
                            }
                        }
                    >
                        {
                            resultProps.children.map((image, i) => (
                                <div key={'imageWrapper'+i} style={{width: `${100 / count}%`}}>{image}</div>
                            ))
                        }
                    </div>
                </div>
                <div
                    className={
                        getClassNameByKey('arrow') + ' ' +
                        getClassNameByKey('arrowRight')
                    }
                    onClick={() => arrowClick('right')}
                >
                </div>
                <div
                    className={
                        getClassNameByKey('arrow') + ' ' +
                        getClassNameByKey('arrowLeft')
                    }
                    onClick={() => arrowClick('left')}
                >
                </div>
            </div>
            {
                resultProps.children.length > 1 &&
                    (
                        <div
                            className={
                                getClassNameByKey('paginationWrapper')
                            }
                        >
                            <div
                                className={getClassNameByKey('wrapperOverflow')}
                            >
                                <div
                                    className={getClassNameByKey('paginationWrapper')}
                                >
                                    {resultProps.children.map((child, index) => {
                                        return (
                                            <div
                                                className={
                                                    getClassNameByKey('paginationDot') + " " + (
                                                        index === resultProps.currentChildren &&
                                                        getClassNameByKey('paginationActiveDot')
                                                    )
                                                }
                                                onClick={() => dotClick(index)}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
            }
        </React.Fragment>
)};

