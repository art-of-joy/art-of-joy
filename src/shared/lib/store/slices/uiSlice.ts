import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setPropsByKey, setPropsByKeys, updatePropsByKey} from "../utils/setProps";
import {tablePropsInterface} from "../../../ui/Table/model/types";
import {innerHintInterface} from "../../../ui/Hint/model/types";
import {innerLayoutInterface} from "../../../ui/Layout/model/types";
import {inputTextPropsInterface} from "../../../ui/formItems/InputText/model/types";

export type elementInterfaces = tablePropsInterface | innerHintInterface | innerLayoutInterface | inputTextPropsInterface

const initialState:Record<string, elementInterfaces> = {}


export const uiSlice = createSlice({
    name:"uiSlice",
    initialState,
    reducers:{
        createElem:(state, action:PayloadAction<elementInterfaces>) => {
            state[action.payload!.id!] = action.payload
        },
        setProps:(state, action:PayloadAction<{id: string, key: string, value: any}>)=>{
            setPropsByKey(state, action)
        },
        setProperties:(state, action: PayloadAction<{id:string, propsArray: Array<{key: string, value: any}>}>) => {
            setPropsByKeys(state, action);
        },
        updateProps: (state, action: PayloadAction<{id: string, key: string, value: any}>) => {
            updatePropsByKey(state, action);
        },
        deleteElem:(state, action: PayloadAction<{id: string}>) => {
            delete state[action.payload!.id];
        }
    }
})

export const {createElem, deleteElem, updateProps, setProps, setProperties} = uiSlice.actions
export default uiSlice.reducer

