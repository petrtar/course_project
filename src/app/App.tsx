import { classNames } from "shared/lib/classNames/classNames";
import { UseTheme } from "app/providers/ThemeProviders/lib/useTheme";
import { AppRouter } from "app/providers/router";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { Suspense } from "react";

const App = () => {
  const { theme } = UseTheme();

  return (
    <div className={classNames("app", {}, [])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};
export default App;
