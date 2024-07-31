import React from 'react';
import {store} from "../../shared/lib/store/store";
import {Button} from "@mui/material";
import cssModules from './userMenu.scss'
import {setMode} from "../../shared/lib/store/slices/pages/profilePageSlice";
import {PROFILE_MODES} from "../../pages/profile/model/const";

export const UserMenu = () => {
    const user = store.getState().user;

    const onClickHandler = (mode: PROFILE_MODES) => {
        store.dispatch(setMode(mode))
    }

    return (
        <>
            <div className={cssModules.sidebarContainer}>
                <ul>
                    <li>
                        <Button
                            onClick={()=> {
                                onClickHandler(PROFILE_MODES.review)
                            }}
                        >Ваши заказы</Button>
                    </li>
                    <li>
                        <Button
                            onClick={()=> {
                                onClickHandler(PROFILE_MODES.review)
                            }}
                        >Ваши отзывы</Button>
                    </li>
                    {user.role == 0 &&
                        <li>
                            <Button
                                onClick={()=> {
                                    onClickHandler(PROFILE_MODES.addProduct)
                                }}
                            >Добавить товары</Button>
                        </li>
                    }
                </ul>
            </div>
        </>
    );
};

