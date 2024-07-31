import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PROFILE_MODES} from "../../../../../pages/profile/model/const";
import {profilePageState} from "../../../../../pages/profile/model/types";




const initialState:profilePageState= {
    mode: PROFILE_MODES.order
}


export const profilePageSlice = createSlice({
    name:"profilePageSlice",
    initialState,
    reducers:{
        setMode: (state, action:PayloadAction<PROFILE_MODES>) => {
            state.mode = action.payload;
        },
    }
})

export const { setMode} = profilePageSlice.actions
export default profilePageSlice.reducer

