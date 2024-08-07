import React from 'react';
import {RootState, store} from "../../../shared/lib/store/store";
import {useSelector} from "react-redux";
import {PROFILE_MODES} from "../../../pages/profile/model/const";

export const Orders = () => {
    const user = store.getState().user;
    const mode = useSelector((state: RootState) => state.profilePage.mode);
    if (mode !== PROFILE_MODES.order)
        return null;
    return (
        <div>

        </div>
    );
};

