import React from 'react';
import {Button} from "@mui/material";
import {InputText, inputTextModel} from "../../shared/ui/formItems/InputText";
import {store} from "../../shared/lib/store/store";
import {updateProps} from "../../shared/lib/store/slices/uiSlice";
import {inputValueType, validator} from "../../shared/ui/formItems/types";
import {setUser} from "../../shared/lib/store/slices/userSlice";
import {auth, User} from "../../entities/user";
import Layout from "../../shared/ui/Layout/ui";
import {addLayoutMember, removeLayoutMember} from "../../shared/ui/Layout/model";
import {AcceptCode} from "../../features/acceptCode";
import {fetch} from "../../shared/lib/request/API";
import {address} from "../../app/config";
export const LoginForm = () => {

    const callBackOKHandler = (response: Record<string, any>) => {
        store.dispatch(setUser(response as User));
        removeLayoutMember("LoginFormLA", [], true);
        addLayoutMember('LoginFormLA', [<AcceptCode/>]);
    }

    const callBackErrorHandler = (error: Record<string, any>) => {
        if (error && error.errorList) {
            const errors = error.errorList as Record<string, any>[];
            errors.forEach(error => {
                store.dispatch(updateProps({id: error.fieldName, key: 'validators', value:
                        [
                            {type: 'custom', errorMessage: 'Пользователь с таким email уже зарегистрирован',
                                customValidation: (value: inputValueType, validator: validator) => {
                                    return false;
                                }
                            }
                        ]}));
                inputTextModel.validate('email');
            });
        }
    }

    const onCLickHandler = () => {
        console.log('до')
        if (inputTextModel.validate('email'))
            console.log('после');
            auth(
                inputTextModel.getValue('email')!,
                "",
                (response)=> callBackOKHandler(response),
                (error) => callBackErrorHandler(error)
            );
    }

    return (
        <Layout
            id={"LoginFormLA"}
            oriental={'vertical'}
            styles={{
                width: 600,
                margin: '50px auto',
                alignItems: 'center'
            }}
        >
            <InputText
                name={'email'}
                id={"email"}
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
            />
            <InputText
                name={'password'}
                id={"password"}
                title={'Пароль'}
                autoValidate={true}
                isPassword={true}
                validators={
                    [
                        {type: 'required', errorMessage: 'Поле "password" обязательно для заполнения'},
                        {
                            type: 'lengthRange',
                            minLength: 5,
                            errorMessage: 'Поле "password" должно состоять минимум из 6 символов'
                        },

                    ]
                }
                // onChange={()=> {
                //     inputTextModel.validate("passwordRepeat")
                // }}
            />
            <Button onClick={onCLickHandler}>Войти</Button>
        </Layout>
    );
};

