import { createBrowserRouter } from "react-router-dom";

// Routes
import protectedRoutes from "@/routes/private";
import publicRoutes from "@/routes/public";
import miscRoutes from "@/routes/misc";

const isAuth = true;
const routes = isAuth ? protectedRoutes : publicRoutes;
export default createBrowserRouter([...miscRoutes, ...routes]);
