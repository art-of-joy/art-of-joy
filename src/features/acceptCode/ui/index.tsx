import React from 'react';
import {InputText, inputTextModel} from "../../../shared/ui/formItems/InputText";
import {fetch} from "../../../shared/lib/request/API";
import {address} from "../../../app/config";
import {store} from "../../../shared/lib/store/store";
import {UserInfoForm} from "../../userInfo";
import {Button} from "@mui/material";
import {setUser} from "../../../shared/lib/store/slices/userSlice";
import {User} from "../../../entities/user";
import {ACCEPT_CODE_TYPES} from "../model/types";

export const AcceptCode = () => {
    const sendRequest = () => {
        fetch('post', `${address}/acceptCode`, {
            headers: {
                "Token": store.getState().user.token,
            },
            params: {
                acceptCode: inputTextModel.getValue('acceptCode'),
                acceptCodeType: ACCEPT_CODE_TYPES.signup
            }
        }, (response) => {
            const userData: User = {...response.data}
            userData.token = store.getState().user.token;
            store.dispatch(setUser(userData));
        },
(error) => {
                inputTextModel.serverValidate(error);
            });
         }

    const onSubmit = (key?: string) => {
        if (inputTextModel.validate('acceptCode')) {
            if(key) {
                if(key == "Enter")
                    sendRequest();
            } else
                sendRequest();
        }
    }

    return (
        <form
            style={{
                display: "flex",
                gap: 20,
                alignItems: "center",
                flexDirection: "column"
            }}
        >
            <InputText
                autoValidate={true}
                validators={[
                    {type:'lengthRange', minLength: 5, maxLength: 6, errorMessage: 'Код подтверждения состоит из 6 цифр'}
                ]}
                title={"Код подтверждения"}
                name={"acceptCode"}
                id={'acceptCode'}
                keyPress={(value, oldValue, key)=> onSubmit(key)}
            />
            <Button onClick={()=> onSubmit()}>Отправить</Button>
        </form>


    );
};

