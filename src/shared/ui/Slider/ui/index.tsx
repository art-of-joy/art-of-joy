import React, {useCallback, useState} from 'react';
import {SliderProps} from "../model/types";
import {getClassName} from "../../../lib/helpers/getClassName";
import {idGeneration} from "../../../lib/store/utils/idGeneration";
import {defaultSliderProps} from "../model/const";
import {getInnerProps} from "../../../lib/store/utils/assignProps";
import {getResultProps} from "../../../lib/store/utils/getProps";

export const Slider: React.FC<SliderProps> = (props) => {

    const [id] = useState(idGeneration(defaultSliderProps.id!));
    const currentSliderProps = getInnerProps(defaultSliderProps, props);
    const resultProps = getResultProps("ui", props.id, currentSliderProps, id);

    const getClassNameByKey = useCallback((key: string) => {
        return getClassName(defaultSliderProps, resultProps, key)
    }, [])

    return (
        <div
            className={getClassNameByKey('wrapper')}
        >
            {props.children}
            <div
                className={
                    getClassNameByKey('arrow') + ' ' +
                    getClassNameByKey('arrowRight')
                }
            >
            </div>
            <div
                className={
                    getClassNameByKey('arrow') + ' ' +
                    getClassNameByKey('arrowLeft')
                }>
            </div>
            <div
                className={
                    getClassNameByKey('paginationWrapper')
                }
            >
                {resultProps.children?.map((child, index) => {
                    return (
                        <div
                            className={
                                getClassNameByKey('paginationDot')+ " " + (
                                    index === resultProps.currentChildren &&
                                    getClassNameByKey('paginationActiveDot')
                                )
                            }
                        >

                        </div>
                    )
                })}
            </div>
        </div>
    );
};

