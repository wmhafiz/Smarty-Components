import React from "react";
import { useRoutes } from "hookrouter";

import Layout from "./components/layout";
import Search from "./routes/search";
import Playground from "./routes/playground";
import WidgetSettings from "./routes/widgets";
import initialStore from "./initial-store";
import "leaflet/dist/leaflet.css";

const NotFoundPage = () => <p>404: Page Not Found</p>;

const routes = {
  "/": () => <Search {...initialStore.explore} />,
  "/widgets": () => <WidgetSettings store={initialStore} />,
  "/play": () => <Playground />
};

const App = () => {
  const routeResult = useRoutes(routes);
  return <Layout>{routeResult || <NotFoundPage />}</Layout>;
};

export default App;
