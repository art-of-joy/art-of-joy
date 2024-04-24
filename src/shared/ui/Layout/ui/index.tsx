// import React, {CSSProperties, useEffect, useState} from "react";
// import {createLayout} from '../model/store/LayoutSlice'
// import {store} from "../../utils/store/store";
// import {getAssignProps, getInnerProps} from "../../utils/props/assignProps";
// import {layoutInterface} from "../model/types";
// import {defaultLayout} from "../model/const";
// import {getResultProps} from "../../utils/helpers/getResultProps";
// import {idGeneration} from "../../utils/helpers/idGeneration";
// import {getClassName} from "../../utils/helpers/getClassName";
//
// export const Layout:React.FC<layoutInterface>= (props) => {
//
//     const [id] = useState(idGeneration(defaultLayout.id!));
//
//     let layoutProps = getInnerProps(defaultLayout, props)
//
//     const resultProps = getResultProps('layoutSlice', props.id, layoutProps, id);
//
//     useEffect(() => {
//         store.dispatch(createLayout(resultProps))
//     }, []);
//
//     let oriental:CSSProperties = resultProps.oriental == "horizontal" ? {flexDirection: 'row'} : {flexDirection: 'column'}
//
//     return(
//         <div
//             data-id={resultProps.id}
//             key={resultProps.id}
//             style={getAssignProps([defaultLayout.styles!, resultProps.styles!, oriental ])}
//             className={ getClassName(resultProps.classNames?.layout?.useDefault!, defaultLayout.classNames?.layout?.name!, resultProps.classNames?.layout?.name!, resultProps.visible) }
//             data-slice={resultProps.sliceName}
//         >{
//             React.Children.toArray(resultProps.children).map((child, index) => (
//                 <React.Fragment key={"childWrapperWindow" + resultProps.id + index}>{child}</React.Fragment>
//             ))
//         }</div>
//     )
// }
//
//
// export default Layout;