import styles from '../../../app/styles/styles.scss'
export const getClassName = (
    defaultProps: Record<string, any>,
    props: Record<string, any>,
    key: string,
    visibility: boolean = true
): string => {
    let resultClassName = '';
    if (props && props.classNames && props.classNames[key].useDefaultClass) {
        if (props.classNames[key].name === defaultProps.classNames[key].name) {
            resultClassName = defaultProps.classNames[key].name;
        }
        else {
            resultClassName = `${defaultProps.classNames[key].name} ${props.classNames[key].name}`;
        }
    }

    else {
        if (props && props.classNames && props.classNames[key] && props.classNames[key].name) {
            resultClassName = props.classNames[key].name
        }
    }

    if(!visibility) {
        resultClassName = resultClassName + " " +styles.hide
    }

    return resultClassName
}
