import React from 'react';
import {Header} from "../widgets/header/header";
import {Page} from "../shared/ui/Page/ui";
import {Table} from "../shared/ui/Table";

export const MainPage = () => {
    return (
        <Page>
            <Header/>
            <Table/>
        </Page>
    );
};

