import React from 'react';
import {Header} from "../widgets/header/header";
import {Page} from "../shared/ui/Page/ui";
import Products from "./profile/components/product/Products";

export const MainPage = () => {
    return (
        <Page>
            <Header/>
            <Products/>
        </Page>
    );
};

