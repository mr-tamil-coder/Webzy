import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import WorkSpace from "../components/Workspace";
import App from "../App";
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
  {
    path: "/workspace/:id",
    element: (
      <Suspense fallback={<Loading />}>
        <WorkSpace />
      </Suspense>
    ),
  },
];

export default routes;
