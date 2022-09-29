import { lazyImport } from "@/utils/lazyImport";
import { Suspense } from "react";
import { RouteObject, Outlet } from "react-router-dom";
import Header from "@/components/header";
import Items from "@/pages/items";

// Pages
const { NotFound } = lazyImport(() => import("@/pages/misc/404"), "NotFound");

const App = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Outlet />
    </Suspense>
  );
};

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        element: <Header />,
        children: [
          {
            index: true,
            element: <h1>User not authenticated</h1>,
          },
          {
            path: "items",
            element: <Items />,
          },
          {
            path: "/login",
            element: <h1>Login</h1>,
          },
          {
            path: "/register",
            element: <h1>Register</h1>,
          },
        ],
      },
    ],
  },
];

export default protectedRoutes;
