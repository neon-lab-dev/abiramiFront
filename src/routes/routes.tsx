import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Client from "../pages/Clients/ListPage";
import Layout from "../layout/Layout";
import Suppliers from "../pages/Suppliers/Suppliers";
import CreateSupplier from "../pages/CreateSupplier/CreateSupplier";
import Invoice from "../pages/Invoices/ListPage";
import InvoiceDetail from "../pages/Invoices/DetailPage";
import CreateInvoice from "../pages/Invoices/CreateInvoice";
import Purchase from "../pages/Purchase/ListPage";
import CreatePurchase from "../pages/Purchase/CreatePurchase";
import ClientDetail from "../pages/Clients/DetailPage";
import CreateClients from "../pages/Clients/CreateClients";
import Inventory from "../pages/Inventory/ListPage";
import CreateInventory from "../pages/Inventory/CreateInventory";
import InventoryTable from "../pages/Inventory/InventoryListPageTable";
import Login from "../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
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
        element: <Client />,
      },
      {
        path: "/clients/DetailPage/:id",
        element: <ClientDetail />,
      },
      {
        path: "/clients/CreateClients",
        element: <CreateClients />,
      },
      {
        path: "/invoices",
        element: <Invoice />,
      },
      {
        path: "/invoices/detailpage/:id",
        element: <InvoiceDetail />,
      },
      {
        path: "/invoices/CreateInvoices",
        element: <CreateInvoice />,
      },
      {
        path: "/purchase",
        element: <Purchase />,
      },
      {
        path: "/purchase/createpurchase",
        element: <CreatePurchase />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/inventory/createInventory",
        element: <CreateInventory />,
      },
      {
        path: "/inventory/InventoryTable/:id",
        element: <InventoryTable />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);
