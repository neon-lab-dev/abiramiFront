import { ICONS } from "../../assets";
import StatusCard from "../../Components/Shared/StatusCard/StatusCard";
import DashboardTable from "../../Components/Dashboard/DashboardTable";
// import RevenueChart from "../../Components/Dashboard/RevenueChart";
import { useEffect, useState } from "react";
import {
  deleteInvoice,
  getDashboardData,
  getGraphData,
  // getGraphData,
  getInvoices,
} from "../../api/api";
import Loader from "../../lib/loader";
import { DashboardApiResponse, DashboardData } from "../../types/dashboard";
import { formatNumber } from "../../utils";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../Invoices/UpdateModal";
import { InvoiceResponse, InvoicesResponse } from "../../types/invoice";
import RevenueChart from "../../Components/Dashboard/RevenueChart";
const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<InvoiceResponse[]>();
  const [dashboard, setDashboard] = useState<DashboardData>();
  const [selectedId, setSelectedId] = useState<string>("");
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [monthlySales, setMonthlySales] = useState([]);
  const [monthlyPurchases, setMonthlyPurchases] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    try {
      const fetchDashboardData = async () => {
        setLoading(true);
        try {
          const response: DashboardApiResponse = await getDashboardData();
          // // const graphResponse=await getGraphData();
          // setMonthlySales(graphResponse.data.sales)
          // setMonthlyPurchases(graphResponse.data.purchase)
          setDashboard(response.data);
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
        } finally {
          setLoading(false);
        }
      };
      const fetchInvoices = async () => {
        setLoading(true);
        try {
          const data: InvoicesResponse = await getInvoices();
          const graphResponse = await getGraphData(); 
          console.log(graphResponse)
          setMonthlySales(graphResponse.data.sales);
          setMonthlyPurchases(graphResponse.data.purchase);
          console.log(monthlySales)
          // Filter invoices that are created today
          const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
          const todayInvoices = data.data.filter((invoice) =>
            invoice.createdAt.startsWith(today)
          );
          setInvoices(todayInvoices);
          console.log(todayInvoices);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchInvoices();

      fetchDashboardData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const editToggleModel = (id: string = "") => {
    setSelectedId(id);
    setEditModalOpen(!isEditModalOpen);
  };

  const handleDelete = async (id?: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await deleteInvoice(id ?? "");
      if (response.status === 200) {
        alert("Invoice deleted Successfully!!!");
        navigate(0);
      }
    } else {
      console.log("Delete action canceled.");
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <StatusCard
              cardBg="bg-secondary-10"
              iconBg="bg-secondary-65"
              title="Invoices"
              value={dashboard?.totalInvoices}
              icon={ICONS.invoices}
            />

            <StatusCard
              cardBg="bg-secondary-20"
              iconBg="bg-secondary-70"
              title="Paid Invoice"
              value={formatNumber(dashboard?.paidInvoices ?? 0)}
              icon={ICONS.paidInvoices}
            />
            <StatusCard
              cardBg="bg-secondary-35"
              iconBg="bg-secondary-75"
              title="Pending Invoices"
              value={formatNumber(dashboard?.pendingInvoices ?? 0)}
              icon={ICONS.pendingInvoice}
            />
            <StatusCard
              cardBg="bg-secondary-80"
              iconBg="bg-secondary-85"
              title="Income Received this Financial year"
              value={formatNumber(dashboard?.incomeReceivedFY ?? 0)}
              icon={ICONS.incomeReceived}
            />
            <StatusCard
              cardBg="bg-secondary-95"
              iconBg="bg-secondary-90"
              title="Invoices this Month"
              value={formatNumber(dashboard?.totalInvoicesThisMonth ?? 0)}
              icon={ICONS.invoiceMonth}
            />
            <StatusCard
              cardBg="bg-secondary-105"
              iconBg="bg-secondary-100"
              title="Sales this Month"
              value={formatNumber(dashboard?.salesThisMonth ?? 0)}
              icon={ICONS.salesMonth}
            />
            <StatusCard
              cardBg="bg-secondary-55"
              iconBg="bg-secondary-110"
              title="Purchase this Month"
              value={formatNumber(dashboard?.purchaseThisMonth ?? 0)}
              icon={ICONS.purchaseMonth}
            />
            <StatusCard
              cardBg="bg-secondary-60"
              iconBg="bg-secondary-115"
              title="Total purchase this Financial year"
              value={formatNumber(dashboard?.totalPurchaseReceivedFY ?? 0)}
              icon={ICONS.totalPurchase}
            />
          </div>
          <RevenueChart
            salesData={monthlySales}
            purchaseData={monthlyPurchases}
          />
          <DashboardTable
            invoices={invoices ?? []}
            editToggleModel={editToggleModel}
            handleDelete={handleDelete}
          />
          {isEditModalOpen && (
            <UpdateModal
              editToggleModel={editToggleModel}
              selectedId={selectedId}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
