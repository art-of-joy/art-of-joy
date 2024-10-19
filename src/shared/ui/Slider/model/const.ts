import {SliderProps} from "./types";
import styles from "../ui/slider.scss";

export const defaultSliderProps: SliderProps = {
    id: "slider",
    classNames: {
        wrapper:{name: styles.slider__wrapper, useDefault:true},
        wrapperOverflow:{name: styles.slider__wrapper__overflow, useDefault:true},
        wrapperInner:{name: styles.slider__wrapper__inner, useDefault:true},
        arrow: {name: styles.slider__arrow, useDefault:true},
        arrowLeft: {name: styles['slider__arrow--left'], useDefault:true},
        arrowRight: {name: styles['slider__arrow--right'], useDefault:true},
        paginationWrapper: {name: styles.slider__pagination__wrapper, useDefault:true},
        paginationDot: {name: styles.slider__pagination__dot, useDefault:true},
        paginationActiveDot: {name: styles['slider__pagination__dot--active'], useDefault:true},
    },
    currentChildren: 0
}