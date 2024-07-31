import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {MainPage} from "../pages/mainPage";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {store} from "../shared/lib/store/store";
import {SignUp} from "../pages/signup";
import {LoginPage} from "../pages/login";
import {ProfilePage} from "../pages/profile/ui/profile";
import {AcceptCodePage} from "../pages/AcceptCodePage";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>
    },
    {
        path: "/signup",
        element: <SignUp/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/profile",
        element: <ProfilePage/>
    },
    {
        path: '/acceptCode',
        element: <AcceptCodePage/>
    }
])

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
