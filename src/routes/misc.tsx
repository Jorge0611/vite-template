import Contact from "@/pages/misc/Contact";
import { RouteObject } from "react-router-dom";
import Form from "@/pages/form";

const miscRoutes: RouteObject[] = [
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/common",
    element: <h1>Common page</h1>,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
];

export default miscRoutes;
