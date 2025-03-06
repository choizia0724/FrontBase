import {useEffect, useState} from 'react'
import './App.css'
import './locales/i18n.jsx';
import {useTranslation} from "react-i18next";
import createDynamicRouter from "@/router/RouterInfo.jsx";
import {RecoilRoot} from "recoil";
import {RouterProvider} from "react-router-dom";

function App() {
    const [router, setRouter] = useState(null);
    const {t,i18n} = useTranslation()

    useEffect(() => {
        createDynamicRouter().then(setRouter);
    }, []);

    useEffect(() => {
        document.title = t('main.homePageName');
    }, [i18n.language]);

    if (!router) return <div>Loading...</div>;

    return (
        <RecoilRoot>
            <RouterProvider router={router}/>
        </RecoilRoot>

    );
}

export default App
