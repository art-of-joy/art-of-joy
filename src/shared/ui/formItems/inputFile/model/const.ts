import {innerInputFileInterface} from "./types";
import inputFileStyles from '../ui/inputFile.scss'
export const defaultInputFile: innerInputFileInterface = {
    id: 'inputFile',
    isDragging: false,
    classNames: {
        label: {name: inputFileStyles.inputFile__label, useDefault: true},
        input: {name: inputFileStyles.inputFile, useDefault: true},
        inputWrapper: {name: inputFileStyles.inputFile__wrapper, useDefault: true},
        inputActive: {name: inputFileStyles['inputFile__label--active'], useDefault: true}
    }
}