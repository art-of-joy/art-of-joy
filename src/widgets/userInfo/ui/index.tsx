import React from 'react';
import {store} from "../../../shared/lib/store/store";

export const UserInfo = () => {
    const user = store.getState().user;
    const onSubmit = () => {}
    return (
        <div>
            <div>{user.email}</div>
            <div>{user.surname}</div>
            <div>{user.firstname}</div>
            <div>{user.middlename}</div>
        </div>
    );
};

