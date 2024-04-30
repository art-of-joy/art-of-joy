import React from 'react';
import {pageInterface} from "../model/types";
import {clearStore} from "../model";

/**Элемент-обёртка, для очистки стора при переходах между страницами*/
export const Page = (props: pageInterface) => {

    clearStore();
    return (

        <>
            {props.children}
        </>

    );
};

