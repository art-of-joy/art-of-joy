import React from 'react';
import {store} from "../../shared/lib/store/store";
import {Button} from "@mui/material";
import {addLayoutMember, removeLayoutMember} from "../../shared/ui/Layout/model";

export const UserMenu = () => {
    const user = store.getState().user;
    return (
        <div>
            {user.role == 0 ?
                <Button
                    onClick={()=> {
                        removeLayoutMember('main_profile_LA', [], true);
                        addLayoutMember('main_profile_LA', []);
                    }}
                >Добавить товары</Button> : ''}
        </div>
    );
};

