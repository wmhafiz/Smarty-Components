import React from "react";
import { useRoutes } from "hookrouter";

import Layout from "./components/layout";
import Search from "./routes/search";
import Widgets from "./routes/widgets";

const NotFoundPage = () => <p>404: Page Not Found</p>;

const routes = {
  "/": () => <Search />,
  "/widgets": () => <Widgets />
};

const App = () => {
  const routeResult = useRoutes(routes);

  return <Layout>{routeResult || <NotFoundPage />}</Layout>;
};

export default App;
