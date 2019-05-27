import React from "react";
import { useRoutes } from "hookrouter";

import Layout from "./components/layout";
import Search from "./routes/search";
import WidgetSettings from "./routes/widgets";

import initialStore from "./initial-store";

const NotFoundPage = () => <p>404: Page Not Found</p>;

const routes = {
  "/": () => <Search {...initialStore.search} />,
  "/widgets": () => <WidgetSettings store={initialStore} />
};

const App = () => {
  const routeResult = useRoutes(routes);
  return <Layout>{routeResult || <NotFoundPage />}</Layout>;
};

export default App;
