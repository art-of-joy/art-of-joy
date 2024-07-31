import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../../../entities/user";
import {ROLE} from "../../../../entities/user/types";

const initialState:User= {}


export const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        setUser:(state, action:PayloadAction<User>) => {
           return state = action.payload
        },
        updateUser:(state, action:PayloadAction<User>) => {
            return state = {...action.payload, ...state}
        },
        deleteUser:(state, action:PayloadAction<User>) => {
            state.token = ''
            state.role = ROLE.guest
            state.firstname = ''
            state.surname = ''
            state.middlename = ''
            return state;
        },
    }
})

export const {setUser,updateUser, deleteUser} = userSlice.actions
export default userSlice.reducer

