import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";

import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { getUserInited, initAuthData } from "@/entities/User";

import { classNames } from "@/shared/lib/classNames/classNames";
import { AppRouter } from "./providers/router";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { PageLoader } from "@/widgets/PageLoader";

const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();

    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) {
        return <PageLoader />;
    }

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
