import React from 'react';
import {InputText} from "../../shared/ui/formItems/InputText";
import {fetch} from "../../shared/lib/request/API";
import {address} from "../../app/config";
import {store} from "../../shared/lib/store/store";

export const AcceptCode = () => {
    console.log(store.getState().user.token);
    return (
        <InputText
            autoValidate={true}
            validators={[
                {type:'lengthRange', minLength: 5, maxLength: 6, errorMessage: 'Код подтверждения состоит из 6 цифр'}
            ]}
            title={"Код подтверждения"}
            name={"acceptCode"}
            id={'acceptCode'}
            keyPress={(value, oldValue, key)=>{
                if(key == 'Enter'){
                    fetch('post', `${address}/acceptCode`, {
                        headers: {
                            "Token": store.getState().user.token,
                        },
                        params: {
                            acceptCode: value,
                            acceptCodeType: 0
                        }
                    }, (response) => {
                        console.log(response);
                    })
                }
            }}
        />
    );
};

