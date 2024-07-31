import React, {CSSProperties, useEffect, useState} from "react";
import {layoutInterface} from "../model/types";
import {defaultLayout} from "../model/const";
import {createElem} from "../../../lib/store/slices/uiSlice";
import {getClassName} from "../../../lib/helpers/getClassName";
import {idGeneration} from "../../../lib/store/utils/idGeneration";
import {getResultProps} from "../../../lib/store/utils/getProps";
import {store} from "../../../lib/store/store";
import {getInnerProps, getAssignProps} from "../../../lib/store/utils/assignProps";

const Layout:React.FC<layoutInterface>= (props) => {

    const [id] = useState(idGeneration(defaultLayout.id!));

    let layoutProps = getInnerProps(defaultLayout, props)

    const resultProps = getResultProps("ui", props.id, layoutProps, id);

    useEffect(() => {
        store.dispatch(createElem(resultProps))
    }, []);

    let oriental:CSSProperties = resultProps.oriental == "horizontal" ? {flexDirection: 'row'} : {flexDirection: 'column'}
    return(
        <>
            <div
                data-id={resultProps.id}
                key={resultProps.id}
                style={getAssignProps([defaultLayout.styles!, resultProps.styles!, oriental])}
                className={getClassName(resultProps.classNames?.layout?.useDefault!, defaultLayout.classNames?.layout?.name!, resultProps.classNames?.layout?.name!, resultProps.visible)}
            >{
                 React.Children.toArray(resultProps.children).map((child, index) => (
                    <React.Fragment key={"childWrapperWindow" + resultProps.id + index}>{child}</React.Fragment>
                 ))
            }</div>
        </>
    );
}
