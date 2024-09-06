import {className, mainProps} from "../../../lib/store/types/props";
import React from "react";

export interface SliderProps extends mainProps {
    children?: React.ReactNode[]
    classNames?: {
        wrapper?: className
        arrow?: className
        arrowLeft?: className
        arrowRight?: className
        paginationWrapper?: className
        paginationDot?: className
        paginationActiveDot?: className
        paginationNumbers?: className
    }
    currentChildren?: number
}