import {ReactNode} from "react";
import {className, innerMainProps, mainProps} from "../../../../lib/store/types/props";
import {formItemInterface, innerFormItemInterface} from "../../types";

export interface inputFileInterface extends mainProps, formItemInterface{
    classNames?: {
        input?: className,
        label?: className,
        inputWrapper?: className
        inputActive?: className
    }
    children?: ReactNode,
    value?:  FileList | null | undefined,
    onChangeInput?(files: FileList | null | undefined): void

}
export interface innerInputFileInterface extends innerMainProps, inputFileInterface, innerFormItemInterface {
    isDragging:boolean
}