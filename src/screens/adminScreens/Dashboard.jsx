import React, { useEffect, useState } from "react";
import axios from "axios";
import { APP_URL } from "@/redux/constants";
import { Loading, ErrorComponent } from "@/components/Loading";
import {
  Users,
  Package,
  ShoppingCart,
  CheckCircle,
  Star,
  DollarSign,
  Activity,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatCard = ({ title, value, icon, trend, percentage }) => {
  const trendColor = trend === "up" ? "text-green-500" : "text-red-500";
  const trendIcon =
    trend === "up" ? <TrendingUp size={16} /> : <Activity size={16} />;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      </div>
      {percentage && (
        <div className="mt-4 flex items-center">
          <span className={`${trendColor} flex items-center mr-2`}>
            {trendIcon}
            <span className="ml-1 text-sm font-medium">{percentage}</span>
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("month");

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${APP_URL}/users/stats`, {
        withCredentials: true,
      });
      setStats(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, []);

  // Sample chart data (replace with your actual data)
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderColor: "rgba(79, 70, 229, 1)",
        tension: 0.4,
      },
    ],
  };

  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "New Users",
        data: [12, 19, 3, 5, 2, 3, 15],
        backgroundColor: "rgba(79, 70, 229, 0.8)",
      },
    ],
  };

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-2 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setTimeRange("week")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                timeRange === "week"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange("month")}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === "month"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange("year")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                timeRange === "year"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={<Users size={20} />}
          trend="up"
          percentage="12.5%"
        />
        <StatCard
          title="Total Products"
          value={stats?.totalProducts || 0}
          icon={<Package size={20} />}
          trend="up"
          percentage="8.3%"
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={<ShoppingCart size={20} />}
          trend="up"
          percentage="24.1%"
        />
        <StatCard
          title="Delivered Orders"
          value={stats?.deliveredOrders || 0}
          icon={<CheckCircle size={20} />}
          trend="up"
          percentage="18.7%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Sales Overview
            </h2>
            <div className="flex items-center text-sm text-indigo-600">
              <DollarSign className="w-4 h-4 mr-1" />
              Revenue
            </div>
          </div>
          <div className="h-80">
            <Line
              data={salesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">User Growth</h2>
            <div className="flex items-center text-sm text-indigo-600">
              <Users className="w-4 h-4 mr-1" />
              New Registrations
            </div>
          </div>
          <div className="h-80">
            <Bar
              data={userGrowthData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
          icon={<DollarSign size={20} />}
          trend="up"
          percentage="22.3%"
        />
        <StatCard
          title="Total Reviews"
          value={stats?.totalReviews || 0}
          icon={<Star size={20} />}
          trend="up"
          percentage="5.8%"
        />
        <StatCard
          title="Avg. Order Value"
          value={`$${(stats?.avgOrderValue || 0).toFixed(2)}`}
          icon={<ShoppingCart size={20} />}
          trend="up"
          percentage="3.2%"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
  