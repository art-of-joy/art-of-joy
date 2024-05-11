import React from 'react';
import {Page} from "../../../shared/ui/Page/ui";
import {Header} from "../../../widgets/header/header";
import {SidebarProfile} from "../../../widgets/profileSidebar/ui";
import mainStyles from "./profile.scss";
import adaptiveStyles from "../../../app/styles/styles.scss";
import Layout from "../../../shared/ui/Layout/ui";
const ProfilePage = () => {

    return (
        <Page>
            <Header></Header>
            <main className={mainStyles.main_container + " " + adaptiveStyles.container}>
                <SidebarProfile></SidebarProfile>
                <Layout id={'main_profile_LA'}></Layout>
            </main>
        </Page>
    );
};

export default ProfilePage;