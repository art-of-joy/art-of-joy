import {className, innerMainProps, mainProps} from "../../../lib/store/types/props";
import {ReactNode} from "react";
export interface layoutInterface extends mainProps{
    oriental?:"horizontal" | "vertical"
    children?: ReactNode[] | ReactNode
    classNames?:{
        layout?:className
    }
}

export interface innerLayoutInterface extends layoutInterface, innerMainProps{

}

