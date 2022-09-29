import { lazyImport } from "@/utils/lazyImport";
import { RouteObject } from "react-router-dom";
import Header from "../components/header";

// Pages
const { App } = lazyImport(() => import("@/pages/misc/App"), "App");
const { NotFound } = lazyImport(() => import("@/pages/misc/404"), "NotFound");

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Header />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/about",
        element: <h1>About</h1>,
      },
      {
        path: "/contact",
        element: <h1>Contact</h1>,
      },
    ],
  },
];

export default publicRoutes;
