import React from 'react';
import {InputText, inputTextModel} from "../../shared/ui/formItems/InputText";
import {Button} from "@mui/material";
import {fetch} from "../../shared/lib/request/API";
import {address} from "../../app/config";
import {store} from "../../shared/lib/store/store";
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
                    {type: 'lengthRange', minValue: 3, errorMessage:'Имя должно состоять минимум из 2 символов'}
                ]}
            />
            <InputText
                id={'firstname_userInfoFormTI'}
                title={'Имя'}
                autoValidate={true}
                validators={[
                    {type: "required", errorMessage:'Поле "Имя" обязательно для заполнения' },
                    {type: 'lengthRange', minValue: 2, errorMessage:'Имя должно состоять минимум из 2 символов'}
                ]}
            />
            <InputText
                id={'middlename_userInfoFormTI'}
                title={'Отчество'}
                name={'middlename'}
                autoValidate={true}
                validators={[
                    {type: 'lengthRange', minValue: 4, errorMessage:'Фамилия должно состоять минимум из 2 символов'}
                ]}
            />

            <Button onClick={
                ()=> {
                    if (
                        inputTextModel.validate('surname_userInfoFormTI') &&
                        inputTextModel.validate('firstname_userInfoFormTI') &&
                        inputTextModel.validate('middlename_userInfoFormTI')
                    ) {
                        fetch('post', `${address}/person`,{
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

