import React from 'react';
import {store} from "../../shared/lib/store/store";
import {Button} from "@mui/material";
import {addLayoutMember, removeLayoutMember} from "../../shared/ui/Layout/model";
import cssModules from './userMenu.scss'

export const UserMenu = () => {
    const user = store.getState().user;
    return (
        <>
            <div className={cssModules.sidebarContainer}>
                <ul>
                    <li><Button>Ваши заказы</Button></li>
                    <li><Button>Ваши отзывы</Button></li>
                    {user.role == 0 &&
                        <li>
                            <Button
                                onClick={()=> {
                                    removeLayoutMember('main_profile_LA', [], true);
                                    addLayoutMember('main_profile_LA', []);
                                }}
                            >Добавить товары</Button>
                        </li>
                    }
                </ul>
            </div>
        </>
    );
};

