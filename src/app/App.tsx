import { classNames } from "shared/lib/classNames/classNames";

import "./styles/index.scss";

import { UseTheme } from "app/providers/ThemeProviders/lib/useTheme";
import { AppRouter } from "app/providers/router";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";

const App = () => {
  const { theme } = UseTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <Navbar />
      <div className="content-page">
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  );
};
export default App;
