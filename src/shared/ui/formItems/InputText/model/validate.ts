import {showError} from "../../../../lib/helpers/errorHandler";
import {store} from "../../../../lib/store/store";
import {innerInputTextPropsInterface} from "./types";
import {inputValueType, validator} from "../../types";
import {setProps, updateProps} from "../../../../lib/store/slices/uiSlice";
import {getValue, validate} from "./api/InputTextUtils";

export const validateInputText = (id: string): Array<number> => {
    const props = store.getState().ui[id]! as innerInputTextPropsInterface;
    const result: Array<number> = [];
    const value = props.value as string;
    if (props.validators) {
        const valueArr = Array.from(value);
        props.validators.forEach((validator, index) => {
            switch (validator.type) {
                case "regexp":
                    if (validator.regexp) {
                        if (!validator.regexp.test(value))
                            result.push(index);
                    }
                    else
                        showError('Не указан regexp для валидатора regexp элемента formItem с id '+ id);
                    break;
                case "lengthRange":
                    if (validator.maxLength && validator.minLength) {
                        if(valueArr.length > validator.maxLength || valueArr.length < validator.minLength) {
                            result.push(index);
                        }
                    } else if (validator.maxLength) {
                        if(valueArr.length > validator.maxLength)
                            result.push(index);
                    } else if (validator.minLength) {
                        if(valueArr.length < validator.minLength)
                            result.push(index);
                    }
                    else
                        showError('Не указан maxLength или minLength для валидатора lengthRange элемента formItem с id '+ id);
                    break;
                case "required":
                    if (value == undefined || value == "" || valueArr.length == 0)
                            result.push(index);
                    break;
                case "contain":
                    if (validator.containValue) {
                        if (!value.includes(String(validator.containValue)))
                            result.push(index);
                    }
                    else
                        showError('Не указан containValue для валидатора contain элемента formItem с id '+ id);
                    break;
                case "notContain":
                    if (validator.containValue) {
                        if (value.includes(String(validator.containValue)))
                            result.push(index);
                    }
                    else
                        showError('Не указан containValue для валидатора notContain элемента formItem с id '+ id);
                    break;
                case "equals":
                    if (validator.equalValue) {
                        if (validator.equalValue == value)
                            result.push(index);
                    }
                    else
                        showError('Не указан equalValue для валидатора equals элемента formItem с id '+ id);
                    break;
                case "notEquals":
                    if (validator.equalValue) {
                        if (validator.equalValue != value)
                            result.push(index);
                    }
                    else
                        showError('Не указан equalValue для валидатора notEquals элемента formItem с id '+ id);
                    break;
                case "custom":
                    if (validator.customValidation) {
                        if(!validator.customValidation(value, validator)) {
                            result.push(index)
                        }
                    } else {
                        showError('Не указан customValidation для валидатора custom элемента formItem с id '+ id);
                    }
                    break;
            }
        })
    }
    return result;
}

export const serverValidation = (responseError: Record<string, any>) => {
    if (responseError && responseError.errorList) {
        const errors = responseError.errorList as Record<string, any>[];
        errors.map(error => {
            const input = store.getState().ui[error.fieldName] as innerInputTextPropsInterface | undefined;
            const wrongValuesField = 'wrong_' + error.fieldName;
            if (input) {
                const serverValidatorIndex = input.validators?.findIndex((validator) => {
                    return validator[wrongValuesField] && validator[wrongValuesField].length > 0;
                });
                if (serverValidatorIndex && serverValidatorIndex != -1 && input.validators) {
                    //Игры с памятью, жаль что не С++(( {...}, [...] это нужно, потому что в store объекты и массивы readonly
                    const validators = [...input.validators];
                    //Запись неверных значений, чтоб человек не мог их заново отправить на бэк
                    const wrongValues =  [...validators[serverValidatorIndex][wrongValuesField]] as Array<string>;
                    wrongValues.push(getValue(error.fieldName)!);
                    const currentValidator = {...validators[serverValidatorIndex]} as validator;
                    currentValidator[wrongValuesField] = wrongValues;
                    validators.splice(serverValidatorIndex, 1);//Удаление старого валидатора
                    validators.push(currentValidator);//Запись нового
                    //Объекты readonly, заменять их напрямую нельзя, поэтому вот
                    store.dispatch(setProps({id: error.fieldName, key: "validators", value: validators}));
                } else {
                    store.dispatch(updateProps({id: error.fieldName, key: 'validators', value:
                            [
                                {type: 'custom', errorMessage: error.message, [wrongValuesField]: [getValue(error.fieldName)],
                                    customValidation: (value: inputValueType, validator: validator) => {
                                        return !validator[wrongValuesField].includes(value);
                                    }
                                }
                            ]
                    }));
                }
                validate(error.fieldName);
            }
        });
    }
}