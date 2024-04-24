import React, {ReactNode} from "react";

import {store} from "../../../lib/store/store";
import {setProps, updateProps} from "../../../lib/store/slices/uiSlice";
import {innerLayoutInterface} from "./types";




export const addLayoutMember = (id:string, members:ReactNode | Array<ReactNode>) => {
    let arr: React.ReactNode[] = [];
    if(Array.isArray(members))
        arr = members;
    else
        arr.push(members);

    store.dispatch(updateProps({id, key: 'members', value: arr}))
}

export const removeLayoutMember = (id:string, membersId: string | Array<string>, all:boolean = false) => {
    const layout = store.getState().ui[id] as innerLayoutInterface;
    const children = layout.children

    let childrenMassive:ReactNode[] = []

    let membersIdMassive:Array<string> = []

    if(!Array.isArray(children))
        childrenMassive.push(children)
    else
        childrenMassive = children

    if(!Array.isArray(membersId))
        membersIdMassive.push(membersId)
    else
        membersIdMassive = membersId

    childrenMassive.forEach((child) => {
        if(React.isValidElement(child)){
           let type = child.type as React.FunctionComponent
           if(!all)
               membersIdMassive.forEach( childId => {
                if(child.props.id && child.props.id == childId) {
                    // store.dispatch(delete)
                } else {
                    const elem = document.querySelector(`[data-id='${childId}']`);
                    if (elem)
                        elem.remove();
                }
               })
           else {
               store.dispatch(setProps({id, key: 'children', value: []}))
           }
        }
    })

}