import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Client from '../pages/Clients/ListPage';
import Layout from "../layout/Layout";
import Suppliers from "../pages/Suppliers/Suppliers";
import CreateSupplier from "../pages/CreateSupplier/CreateSupplier";
import Invoice from '../pages/Invoices/ListPage';
import InvoiceDetail from '../pages/Invoices/DetailPage';
import CreateInvoice from "../pages/Invoices/CreateInvoice";
import Purchase from "../pages/Purchase/ListPage"
import CreatePurchase from "../pages/Purchase/CreatePurchase";
import ClientDetail from "../pages/Clients/DetailPage";
import CreateClients from "../pages/Clients/CreateClients";

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
        path: "/clients/DetailPage",
        element: <ClientDetail/>
      },
      {
        path: "/clients/CreateClients",
        element: <CreateClients/>
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
        path: "/invoices/CreateInvoices",
        element : <CreateInvoice/>
      },
      {
        path: "/purchase",
        element: <Purchase/>
      },
      {
        path: "/purchase/CreatePurchase",
        element: <CreatePurchase />,
      },
    ]
  },
]);
