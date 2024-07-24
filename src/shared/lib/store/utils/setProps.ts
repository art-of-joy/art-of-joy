
import {PayloadAction} from "@reduxjs/toolkit";
import {isObject} from "../../helpers/isObject";
import {getAssignProps} from "./assignProps";
export const setPropsByKey = <T>(
    state: Record<string, T>,
    action: PayloadAction<{ id: string; key: string; value: any }>
) => {
    const { key, value, id } = action.payload;
    if(key.includes('.')) {
        (state[id] as {[key: string]: any})[eval(key)] = value;
    } else {
        (state[id] as { [key: string]: any })[key as string] = value;
    }
};

export const setPropsByKeys = <T> (
    state: Record<string, T>,
    action: PayloadAction<{ id: string; propsArray: Array<{key: string, value: any}> }>
) => {
    const { id, propsArray } = action.payload;
    const elem = state[id] as { [key: string]: any }
    propsArray.forEach(_ => elem[_.key] = _.value)
}

export const updatePropsByKey = <T extends { [key: string]: any}>(
    state: Record<string, T>,
    action: PayloadAction<{ id: string; key: string; value: any }>
) => {
    const { key, value, id } = action.payload;
    const oldValue = (state[id] as T)[key as string];
    if (Array.isArray(oldValue)) {
        if(Array.isArray((state[id] as { [key: string]: any })[key as string])) {
            (state[id] as { [key: string]: any })[key as string] = oldValue.concat(value);
        } else {
            (state[id] as { [key: string]: any })[key as string] = [oldValue, ...value];
        }
    }
    else if (isObject(oldValue))
        (state[id] as { [key: string]: any })[key as string] = getAssignProps([oldValue, value]);
    else if (typeof oldValue == 'string') {
    }
}