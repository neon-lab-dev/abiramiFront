import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Client from '../pages/Clients/ListPage';
import Layout from "../layout/Layout";
import Suppliers from "../pages/Suppliers/Suppliers";
import CreateSupplier from "../pages/CreateSupplier/CreateSupplier";
import Invoice from '../pages/Invoices/ListPage';
import InvoiceDetail from '../pages/Invoices/DetailPage'
import Purchase from "../pages/Purchase/ListPage"
import CreatePurchase from "../pages/Purchase/CreatePurchase";
import Inventory from "../pages/Inventory/ListPage"

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
        path: "suppliers",
        element: <Suppliers />,
      },
      {
        path: "suppliers/createsupplier",
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
      },
      {
        path: "/purchase",
        element: <Purchase/>
      },
      {
        path: "/purchase/createpurchase",
        element: <CreatePurchase />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
    ]
  },
]);
