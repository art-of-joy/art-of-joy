import React from 'react';
import {AddProduct} from "../../../../features/addProduct/ui";
import {Reviews} from "../../../reviews/ui";
import {Orders} from "../../../orders/ui";

export const ProfileMain = () => {
    return (
        <React.Fragment>
            <AddProduct/>
            <Reviews></Reviews>
            <Orders></Orders>
        </React.Fragment>
    );
};

