import React from 'react';
import {Button} from "@mui/material";
import {InputText, inputTextModel} from "../../shared/ui/formItems/InputText";
import {store} from "../../shared/lib/store/store";
import {setProps, updateProps} from "../../shared/lib/store/slices/uiSlice";
import {inputValueType, validator} from "../../shared/ui/formItems/types";
import {setUser} from "../../shared/lib/store/slices/userSlice";
import {auth, registration, User} from "../../entities/user";
import Layout from "../../shared/ui/Layout/ui";
import {addLayoutMember, removeLayoutMember} from "../../shared/ui/Layout/model";
import {AcceptCode} from "../../features/acceptCode";
import {innerInputTextPropsInterface} from "../../shared/ui/formItems/InputText/model/types";
import {Link} from "react-router-dom";
export const LoginForm = () => {

    const callBackOKHandler = (response: Record<string, any>) => {
        store.dispatch(setUser(response as User));
        removeLayoutMember("regLA", [], true);
        addLayoutMember('regLA', [<AcceptCode/>]);
    }

    const callBackErrorHandler = (error: Record<string, any>) => {
        if (error && error.errorList) {
            const errors = error.errorList as Record<string, any>[];
            const input = store.getState().ui.email_authFormTI as innerInputTextPropsInterface;
            const emailValidatorIndex = input.validators?.findIndex((validator) => {
                return validator.wrongEmails && validator.wrongEmails.length > 0;
            });
            errors.map(error => {
                if (error.fieldName) {
                    if (emailValidatorIndex && emailValidatorIndex != -1 && input.validators) {
                        const validators = input.validators
                        validators[emailValidatorIndex].wrongEmails.push(inputTextModel.getValue('email_authFormTI'));
                        store.dispatch(setProps({id: error.fieldName, key: "validators", value: validators}));
                    } else {
                        store.dispatch(updateProps({id: error.fieldName, key: 'validators', value:
                                [
                                    {type: 'custom', errorMessage: 'Пользователь с таким email не зарегистрирован', wrongEmails: [inputTextModel.getValue('email_authFormTI')],
                                        customValidation: (value: inputValueType, validator: validator) => {
                                            return !validator.wrongEmails.includes(value);
                                        }
                                    }
                                ]}));
                    }
                }
                inputTextModel.validate('email_authFormTI');
            });
        }
    }

    const sendRequest = () => {
        auth(
            inputTextModel.getValue('email_authFormTI')!,
            inputTextModel.getValue('password_authFormTI')!,
            '',
            0,
            (response)=> callBackOKHandler(response),
            (error) => callBackErrorHandler(error)
        );
    }

    const onSubmit = (key?:string) => {
        if (inputTextModel.validate('email_authFormTI')) {
            if(key) {
                if(key == "Enter")
                    sendRequest();
            } else
                sendRequest();
        }
    }

    return (
        <Layout
            id={"loginLA"}
            oriental={'vertical'}
            styles={{
                width: 600,
                margin: '50px auto',
                alignItems: 'center'
            }}
        >
            <InputText
                name={'email_authFormTI'}
                id={"email_authFormTI"}
                title={'email'}
                autoValidate={true}
                validators={
                    [
                        {type: 'required', errorMessage: 'Поле "email" обяазтельно для заполнения'},
                        {type: 'contain', containValue: '@', errorMessage: 'Поле "email" должно содержать @'},
                        {
                            type: 'lengthRange',
                            minLength: 5,
                            errorMessage: 'Поле "email" должно состоять минимум из 6 символов'
                        },
                    ]
                }
                keyPress={(value, oldValue, key) => onSubmit(key)}
            />
            <InputText
                id={'password_authFormTI'}
                title={'Пароль'}
                name={'password'}
                autoValidate={true}
                isPassword={true}
                validators={[
                    {type: 'lengthRange', minValue: 4, errorMessage: '"Пароль" должно состоять минимум из 4 символов'}
                ]}
                keyPress={(value, oldValue, key) => onSubmit(key)}
            />
            <Button onClick={() => onSubmit()}>Войти</Button>
            <p>Нет аккаунта?<Link to={'/signup'}> Зарегистрируйтесь </Link></p>
        </Layout>
    );
};

