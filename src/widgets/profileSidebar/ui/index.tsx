import React from 'react';
import {UserInfo} from "../../userInfo/ui";
import sidebarStyles from './sidebar.scss';
import {UserMenu} from "../../userMenu";
export const SidebarProfile = () => {
    return (
        <div className={sidebarStyles.sidebar}>
            <UserInfo></UserInfo>
            <UserMenu></UserMenu>
        </div>
    );
};

