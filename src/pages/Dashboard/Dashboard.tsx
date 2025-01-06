import { ICONS } from "../../assets";
import StatusCard from "../../Components/Shared/StatusCard/StatusCard";
import DashboardTable from "../../Components/Dashboard/DashboardTable";
import RevenueChart from "../../Components/Dashboard/RevenueChart";
const Dashboard = () => {
  const monthlySales = [10, 200, 300, 400, 500, 600, 700]; // Replace with actual sales data
  const monthlyPurchases = [50, 150, 250, 350, 450, 550, 650]; // Replace with actual purchase data

  return (
    <div>
      <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <StatusCard
          cardBg="bg-secondary-10"
          iconBg="bg-secondary-65"
          title="Invoices"
          value="7265"
          icon={ICONS.invoices}
        />

        <StatusCard
          cardBg="bg-secondary-20"
          iconBg="bg-secondary-70"
          title="Paid Invoice"
          value="17256"
          icon={ICONS.paidInvoices}
        />
        <StatusCard
          cardBg="bg-secondary-35"
          iconBg="bg-secondary-75"
          title="Pending Invoices"
          value="5"
          icon={ICONS.pendingInvoice}
        />
        <StatusCard
          cardBg="bg-secondary-80"
          iconBg="bg-secondary-85"
          title="Income Received this Financial year"
          value="89,27,265.00"
          icon={ICONS.incomeReceived}
        />
        <StatusCard
          cardBg="bg-secondary-95"
          iconBg="bg-secondary-90"
          title="Invoices this Month"
          value="600"
          icon={ICONS.invoiceMonth}
        />
        <StatusCard
          cardBg="bg-secondary-105"
          iconBg="bg-secondary-100"
          title="Sales this Month"
          value="89,27,265.00"
          icon={ICONS.salesMonth}
        />
        <StatusCard
          cardBg="bg-secondary-55"
          iconBg="bg-secondary-110"
          title="Purchase this Month"
          value="9,27,265.00"
          icon={ICONS.purchaseMonth}
        />
        <StatusCard
          cardBg="bg-secondary-60"
          iconBg="bg-secondary-115"
          title="Total purchase this Financial year"
          value="1,99,27,265.00"
          icon={ICONS.totalPurchase}
        />
      </div>
      <RevenueChart salesData={monthlySales} purchaseData={monthlyPurchases} />
      <DashboardTable />
    </div>
  );
};

export default Dashboard;
