import React from 'react';
import {Button} from "@mui/material";
import {InputText, inputTextModel} from "../../shared/ui/formItems/InputText";
import {store} from "../../shared/lib/store/store";
import {setUser} from "../../shared/lib/store/slices/userSlice";
import {auth, registration, User} from "../../entities/user";
import Layout from "../../shared/ui/Layout/ui";
import {addLayoutMember, removeLayoutMember} from "../../shared/ui/Layout/model";
import {AcceptCode} from "../../features/acceptCode";
import {Link} from "react-router-dom";
import {enterFormInterface} from "./model/types";
export const EnterForm = (props: enterFormInterface) => {



    const callBackOKHandler = (response: Record<string, any>) => {
        if (props.isAuth) {
            switch (props.authType) {
                case 1:
                    store.dispatch(setUser(response as User));
                    removeLayoutMember("regLA", [], true);
                    addLayoutMember('regLA', [<AcceptCode/>]);
                break;
                case 0:
                case 2:
                    store.dispatch(setUser(response as User));
                    removeLayoutMember("regLA", [], true);
                    addLayoutMember('regLA', [<AcceptCode/>]);
                break;
            }

        }

    }

    const callBackErrorHandler = (error: Record<string, any>) => inputTextModel.serverValidate(error)

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
            <p>Нет аккаунта?<Link to={'/login'}> Зарегистрируйтесь </Link></p>
        </Layout>
    );
};

