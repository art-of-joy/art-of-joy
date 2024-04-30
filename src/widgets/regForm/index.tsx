import React from 'react';
import {Button} from "@mui/material";
import {InputText, inputTextModel} from "../../shared/ui/formItems/InputText";
import {store} from "../../shared/lib/store/store";
import {setUser} from "../../shared/lib/store/slices/userSlice";
import {registration, User} from "../../entities/user";
import Layout from "../../shared/ui/Layout/ui";
import {addLayoutMember, removeLayoutMember} from "../../shared/ui/Layout/model";
import {AcceptCode} from "../../features/acceptCode";
import {Link} from "react-router-dom";
export const RegistrationForm = () => {

    const callBackOKHandler = (response: Record<string, any>) => {
        store.dispatch(setUser(response as User));
        removeLayoutMember("regLA", [], true);
        addLayoutMember('regLA', [<AcceptCode/>]);
    }

    const callBackErrorHandler = (error: Record<string, any>) => {
        inputTextModel.serverValidate(error);
    }


    const sendRequest = () => {
        registration(
            inputTextModel.getValue('email_regFormTI')!,
            (response)=> callBackOKHandler(response),
            (error) => callBackErrorHandler(error)
        );
    }

    const onSubmit = (key?:string) => {
        if (inputTextModel.validate('email_regFormTI')) {
            if(key) {
                if(key == "Enter")
                    sendRequest();
            } else
                sendRequest();
        }
    }

    return (
        <Layout
            id={"regLA"}
            oriental={'vertical'}
            styles={{
                width: 600,
                margin: '50px auto',
                alignItems: 'center'
            }}
        >
            <InputText
                name={'email_regFormTI'}
                id={"email_regFormTI"}
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
                keyPress={(value, oldValue, key)=> onSubmit(key)}
            />
            <Button onClick={() => onSubmit()}>Зарегистрироваться</Button>
            <p>Уже зарегистрированы?<Link to={'/login'}> Войдите </Link></p>
        </Layout>
    );
};

