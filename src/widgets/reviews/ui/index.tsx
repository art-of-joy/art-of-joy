import React from 'react';
import {RootState, store} from "../../../shared/lib/store/store";
import {useSelector} from "react-redux";
import {PROFILE_MODES} from "../../../pages/profile/model/const";

export const Reviews = () => {
    const mode = useSelector((state: RootState) => state.profilePage.mode);
    if (mode !== PROFILE_MODES.review)
        return null;
    return (
        <div>

        </div>
    );
};

