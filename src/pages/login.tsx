import React from 'react';
import {Header} from "../widgets/header/header";
import {LoginForm} from "../widgets/loginForm";
import {Page} from "../shared/ui/Page/ui";

export const LoginPage = () => {
    return (
        <Page>
            <Header/>
            <LoginForm/>
        </Page>
    );
};

