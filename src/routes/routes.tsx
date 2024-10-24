import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Client from '../pages/Clients/ListPage';
import Layout from "../layout/Layout";
import Suppliers from "../pages/Suppliers/Suppliers";
import CreateSupplier from "../pages/CreateSupplier/CreateSupplier";
import Invoice from '../pages/Invoices/ListPage';
import InvoiceDetail from '../pages/Invoices/DetailPage'

export const router = createBrowserRouter([  
  {
    path: "/",
    element: <Layout/>,
    errorElement : <ErrorPage/>,
    children : [
      {
          path: "",
          element: <Dashboard/>
      },
      {
        path: "/Suppliers",
        element: <Suppliers />,
      },
      {
        path: "/Suppliers/CreateSupplier",
        element: <CreateSupplier />,
      },
      {
        path: "/clients",
        element: <Client/>
      },
      {
        path: "/invoices",
        element : <Invoice/>
      },
      {
        path: "/invoices/detailpage",
        element : <InvoiceDetail/>
      }
    ]
  },
]);
