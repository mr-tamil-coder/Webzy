import { lazy, Suspense } from "react";
import App from "../App";
import Loading from "../components/Loading";
const Home = lazy(() => import("../pages/Home"));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
  },
];

export default routes;
