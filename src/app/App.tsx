import { classNames } from "shared/lib/classNames/classNames";

import "./styles/index.scss";

import { UseTheme } from "app/providers/ThemeProviders/lib/useTheme";
import { AppRouter } from "app/providers/router";
import { Navbar } from "widgets/Navbar";

const App = () => {
  const { theme, toggleTheme } = UseTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <Navbar />
      <AppRouter />
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};
export default App;
