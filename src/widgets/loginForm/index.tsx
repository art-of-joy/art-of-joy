import React, {useEffect} from 'react';
import {Button} from "@mui/material";
import {InputText, inputTextModel} from "../../shared/ui/formItems/InputText";
import {store} from "../../shared/lib/store/store";
import {setUser} from "../../shared/lib/store/slices/userSlice";
import {auth, User} from "../../entities/user";
import Layout from "../../shared/ui/Layout/ui";
import {Link, useNavigate} from "react-router-dom";
export const LoginForm = () => {

    const navigate= useNavigate();
    const callBackOKHandler = (response: Record<string, any>) => {
        const userData: User = {...response.data}
        userData.token = response.headers.token;
        store.dispatch(setUser(userData));
        navigate('/profile');
    }
    if (store.getState().user.token) {
        auth(
            "",
            "",
            '',
            store.getState().user.token!,
            3,
            (response)=> callBackOKHandler(response),
            (error) => {}
        );
        return null;
    } else {


        const callBackErrorHandler = (error: Record<string, any>) => {
            if (error && error.data && error.data.errorList) {
                inputTextModel.serverValidate(error.data);
            }
        }

        const sendRequest = () => {
            auth(
                inputTextModel.getValue('email_authFormTI')!,
                inputTextModel.getValue('password_authFormTI')!,
                '',
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
                    value={'shlyapnikov.nik@mail.ru'}
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
                    value={'Password1'}

                    autoValidate={true}
                    isPassword={true}
                    validators={[
                        {type: 'lengthRange', minValue: 4, errorMessage: '"Пароль" должно состоять минимум из 4 символов'}
                    ]}
                    keyPress={(value, oldValue, key) => onSubmit(key)}
                />
                <Button onClick={() => onSubmit()}>Войти</Button>
                <p>Нет аккаунта? <Link to={'/signup'}> Зарегистрируйтесь </Link></p>
            </Layout>
        );
    }
};

