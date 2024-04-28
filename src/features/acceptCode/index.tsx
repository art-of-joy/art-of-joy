import React from 'react';
import {InputText, inputTextModel} from "../../shared/ui/formItems/InputText";
import {fetch} from "../../shared/lib/request/API";
import {address} from "../../app/config";
import {store} from "../../shared/lib/store/store";
import {addLayoutMember, removeLayoutMember} from "../../shared/ui/Layout/model";
import {UserInfoForm} from "../userInfo";
import {Button} from "@mui/material";
import {setProps, updateProps} from "../../shared/lib/store/slices/uiSlice";
import {updateUser} from "../../shared/lib/store/slices/userSlice";
import {User} from "../../entities/user";
import {innerInputTextPropsInterface} from "../../shared/ui/formItems/InputText/model/types";
import {inputValueType, validator} from "../../shared/ui/formItems/types";

export const AcceptCode = () => {

    const sendRequest = () => {
        fetch('post', `${address}/acceptCode`, {
            headers: {
                "Token": store.getState().user.token,
            },
            params: {
                acceptCode: inputTextModel.getValue('acceptCode'),
                acceptCodeType: 0
            }
        }, (response) => {
            const user = response as User;
            store.dispatch(updateUser(user));
            removeLayoutMember('regLA', [], true);
            addLayoutMember('regLA', <UserInfoForm/>);
        },
(error) => {
                if (error && error.errorList) {
                    const errors = error.errorList as Record<string, any>[];
                    const input = store.getState().ui.acceptCode as innerInputTextPropsInterface;
                    const codesValidatorIndex = input.validators?.findIndex((validator) => {
                        return validator.wrongCodes && validator.wrongCodes.length > 0;
                    });
                    errors.map(error => {
                        if (codesValidatorIndex && codesValidatorIndex != -1 && input.validators) {
                            const validators = [...input.validators];//Игры с памятью, жаль что не С++((
                            const wrongCodes =  [...validators[codesValidatorIndex].wrongCodes] as Array<string>;
                            wrongCodes.push(inputTextModel.getValue(error.fieldName)!);
                            const currentValidator = {...validators[codesValidatorIndex]} as validator;
                            currentValidator.wrongCodes = wrongCodes;
                            validators.push(currentValidator);
                            store.dispatch(setProps({id: error.fieldName, key: "validators", value: validators}));
                        } else {
                            store.dispatch(updateProps({id: error.fieldName, key: 'validators', value:
                                    [
                                        {type: 'custom', errorMessage: error.message, wrongCodes: [inputTextModel.getValue(error.fieldName)],
                                            customValidation: (value: inputValueType, validator: validator) => {
                                                return !validator.wrongCodes.includes(value);
                                            }
                                        }
                                    ]
                            }));
                        }
                        inputTextModel.validate(error.fieldName);
                    });
                }
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

