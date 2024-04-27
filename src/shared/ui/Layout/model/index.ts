import React, {ReactNode} from "react";
import {store} from "../../../lib/store/store";
import {setProps, updateProps, deleteElem} from "../../../lib/store/slices/uiSlice";
import {innerLayoutInterface} from "./types";




export const addLayoutMember = (id:string, members:ReactNode | Array<ReactNode>) => {
    let arr: React.ReactNode[] = [];
    if(Array.isArray(members))
        arr = members;
    else
        arr.push(members);

    store.dispatch(setProps({id, key: 'children', value: arr}));
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
                    store.dispatch(deleteElem({id: childId}));
                } else {
                    const elem = document.querySelector(`[data-id='${childId}']`);
                    if (elem)
                        elem.remove();
                }

               })
           else {
               membersIdMassive.forEach( childId => {
                   if(store.getState().ui[childId]) {
                       store.dispatch(deleteElem({id: childId}));
                   }
               });

           }
        } else {
            // const elem = document.querySelector(`[data-id='${childId}']`);
            // const elementsWithDataId = document.querySelectorAll('[data-id]');
            //
            // // Создаем пустой массив для хранения значений data-id
            // const idsArray: string[] = [];
            //
            // // Проходим по каждому элементу и добавляем значение data-id в массив
            // elementsWithDataId.forEach((element: HTMLElement) => {
            //     const dataIdValue = element.getAttribute('data-id');
            //     if (dataIdValue) {
            //         idsArray.push(dataIdValue);
            //     }
            // });
        }
    })

}