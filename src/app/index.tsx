import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {MainPage} from "../pages/mainPage";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {store} from "../shared/lib/store/store";
import {SignUp} from "../pages/signup";

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
        path: "/auth",
        element: <SignUp/>
    },
])

root.render(

    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
