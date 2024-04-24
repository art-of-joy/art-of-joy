// import {ReactNode} from "react";
// import {addLayoutMember, removeLayoutMember} from "../index";
// import {store} from "../../../utils/store/store";
// import {setLayoutProperties, setLayoutProps} from "../store/LayoutSlice";
// import {layoutInterface} from "../types";
//
// export const addMembers = (id:string, member:ReactNode | Array<ReactNode>) =>
//     addLayoutMember(id,member)
//
// export const removeMember = (id:string, member: string | Array<string>) => {
//     removeLayoutMember(id, member)
// }
//
// export const clear = (id:string) => removeLayoutMember(id, [], true)
//
// export const setProps = (id:string, key: keyof layoutInterface, value: any) => {
//     store.dispatch(setLayoutProps({id, key,value}))
// }
//
// export const setPropsArr = (id:string, propsArray: Array<{key: keyof layoutInterface, value: any}>) => {
//     store.dispatch(setLayoutProperties({id,propsArray}))
// }