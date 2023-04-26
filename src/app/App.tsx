import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { UseTheme } from "@/app/providers/ThemeProviders/lib/useTheme";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { getUserInited, userActions } from "@/entities/User";

import { classNames } from "@/shared/lib/classNames/classNames";
import { AppRouter } from "./providers/router";

const App = () => {
    const { theme } = UseTheme();
    const dispatch = useDispatch();

    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames("app", {}, [theme])}>
            <Suspense fallback=''>
                <Navbar />
                <div className='content-page'>
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};
export default App;
