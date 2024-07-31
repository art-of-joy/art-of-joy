import React from 'react';
import {Page} from "../../../shared/ui/Page/ui";
import {Header} from "../../../widgets/header/header";
import {SidebarProfile} from "../../../widgets/profile/profileSidebar/ui";
import mainStyles from "./profile.scss";
import adaptiveStyles from "../../../app/styles/styles.scss";
import {ProfileMain} from "../../../widgets/profile/profileMain/ui/idnex";
export const ProfilePage = () => {

    return (
        <Page>
            <Header></Header>
            <main className={mainStyles.main_container + " " + adaptiveStyles.container}>
                <SidebarProfile></SidebarProfile>
                <ProfileMain></ProfileMain>
            </main>
        </Page>
    );
};

