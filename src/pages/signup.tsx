import React from 'react';
import {Header} from "../widgets/header/header";
import {RegistrationForm} from "../widgets/regForm";
import {Page} from "../shared/ui/Page/ui";

export const SignUp = () => {
    return (
        <Page>
            <Header/>
            <RegistrationForm/>
        </Page>
    );
};

