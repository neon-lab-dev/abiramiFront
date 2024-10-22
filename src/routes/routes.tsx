import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Layout from "../layout/Layout";

export const router = createBrowserRouter([  
  {
    path: "/",
    element: <Layout/>,
    // errorElement : <ErrorPage/>,
    children : [
      {
          path: "",
          element: <Dashboard/>
      },
      {
        path: "/chilent",
        element: <ErrorPage/>
    },
    ]
  },
]);
