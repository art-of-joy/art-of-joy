import React from 'react';
import {InputText, inputTextModel} from "../../shared/ui/formItems/InputText";
import {Button} from "@mui/material";
import {fetch} from "../../shared/lib/request/API";
import {address} from "../../app/config";
import {store} from "../../shared/lib/store/store";
import {inputValueType, validator} from "../../shared/ui/formItems/types";
import {setUser} from "../../shared/lib/store/slices/userSlice";
import {User} from "../../entities/user";
export const UserInfoForm = () => {
    return (
        <form>
            <p>Укажите данные для будущих заказов</p>
            <InputText
                id={'surname_userInfoFormTI'}
                title={'Фамилия'}
                autoValidate={true}
                validators={[
                    {type: "required", errorMessage:'Поле "Имя" обязательно для заполнения' },
                    {type: 'lengthRange', minValue: 3, errorMessage:'Поле "Фамилия" должно состоять минимум из 2 символов'}
                ]}
            />
            <InputText
                id={'firstname_userInfoFormTI'}
                title={'Имя'}
                autoValidate={true}
                validators={[
                    {type: "required", errorMessage:'Поле "Имя" обязательно для заполнения' },
                    {type: 'lengthRange', minValue: 2, errorMessage:'Поле "Имя" должно состоять минимум из 2 символов'}
                ]}
            />
            <InputText
                id={'middlename_userInfoFormTI'}
                title={'Отчество'}
                name={'middlename'}
                autoValidate={true}
                validators={[
                    {type: 'lengthRange', minValue: 4, errorMessage:'Поле "Отчество" должно состоять минимум из 2 символов'}
                ]}
            />

            <Button onClick={
                ()=> {
                    if (
                        inputTextModel.validate('surname_userInfoFormTI') &&
                        inputTextModel.validate('firstname_userInfoFormTI') &&
                        inputTextModel.validate('middlename_userInfoFormTI')
                    ) {
                        fetch('post', `${address}/personInfo`,{
                                headers: {
                                    Token: store.getState().user.token
                                },
                                params: {
                                    surname: inputTextModel.getValue('surname_userInfoFormTI'),
                                    firstname: inputTextModel.getValue('firstname_userInfoFormTI'),
                                    middlename: inputTextModel.getValue('middlename_userInfoFormTI'),
                                    email:  store.getState().user.email
                                }
                            },
                            (response)=> {
                                store.dispatch(setUser(response.data as User));
                            },
                            (error)=> {
                                console.error(error);
                            });
                    }
                }}>Отправить</Button>
            <p>Установите пароль, чтоб входить без подтверждения</p>
            <InputText
                id={'password_userInfoFormTI'}
                title={'Пароль'}
                name={'password'}
                autoValidate={true}
                isPassword={true}
                validators={[
                    {type: 'lengthRange', minValue: 4, errorMessage:'"Пароль" должно состоять минимум из 4 символов'}
                ]}
                onChange={() => {
                    inputTextModel.validate('passwordRepeat_userInfoFormTI');
                }}
            />
            <InputText
                id={'passwordRepeat_userInfoFormTI'}
                title={'Повторите пароль'}
                name={'password_repeat'}
                autoValidate={true}
                isPassword={true}
                validators={[
                    {type: 'lengthRange', minValue: 4, errorMessage:'"Пароль" должно состоять минимум из 4 символов'},
                    {type: 'custom', errorMessage: 'Пароли не совпадают',
                        customValidation(value: inputValueType, validator: validator) {
                            return inputTextModel.getValue('passwordRepeat_userInfoFormTI') == inputTextModel.getValue('password_userInfoFormTI')
                        }
                    }
                ]}
            />
            <Button onClick={
                ()=> {
                    if (
                        inputTextModel.validate('passwordRepeat_userInfoFormTI') &&
                        inputTextModel.validate('password_userInfoFormTI')
                    ) {
                        fetch('post', `${address}/password`,{
                                headers: {
                                    Token: store.getState().user.token
                                },
                                params: {
                                    password: inputTextModel.getValue('password_userInfoFormTI'),
                                    repeatPassword: inputTextModel.getValue('passwordRepeat_userInfoFormTI')
                                }
                            },
                            (response)=> {
                                console.log(response);
                            },
                            (error)=> {
                                console.error(error);
                            });
                    }
                }}>Отправить</Button>
        </form>
    );
};

