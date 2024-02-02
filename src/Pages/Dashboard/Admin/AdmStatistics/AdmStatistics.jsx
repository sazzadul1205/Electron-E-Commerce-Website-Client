import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import {
  FaBox,
  FaMoneyBillAlt,
  FaShoppingBag,
  FaShuttleVan,
  FaMoneyBill,
} from "react-icons/fa";
import StatisticsCard from "./StatisticsCard/StatisticsCard";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const AdmStatistics = () => {
  const axiosPublic = useAxiosPublic();

  const { data: orderHistory = [], isLoading } = useQuery({
    queryKey: ["orderHistory"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/OrderHistory`);
      return res.data;
    },
  });

  const [statistics, setStatistics] = useState({
    orderedCount: 0,
    onTransitCount: 0,
    deliveredCount: 0,
    totalOrderedPrice: 0,
    totalOnTransitPrice: 0,
    totalDeliveredPrice: 0,
    originalProductPrice: 0,
    taxedOrdersCount: 0,
    originalOrderedTotal: 0,
    taxDeductedAmount: 0,
    deliveryPrice: 0,
  });

  useEffect(() => {
    if (orderHistory) {
      const ordered = orderHistory.filter(
        (order) => order.orderState === "Ordered"
      );
      const onTransit = orderHistory.filter(
        (order) => order.orderState === "On Transit"
      );
      const delivered = orderHistory.filter(
        (order) => order.orderState === "Delivered"
      );

      const calculateTotalPrice = (orders) =>
        orders.reduce((acc, order) => acc + parseFloat(order.totalPrice), 0);

      const originalPrice = delivered.reduce(
        (acc, order) =>
          acc +
          order.products.reduce(
            (productAcc, product) =>
              productAcc + parseFloat(product.originalPrice),
            0
          ),
        0
      );

      const taxedOrders = delivered.filter(
        (order) => parseFloat(order.totalPrice) * 0.1 > 0
      );

      const originalOrderedTotal = delivered.reduce(
        (acc, order) => acc + parseFloat(order.totalPrice) * 0.9,
        0
      );

      const taxDeductedAmount = delivered.reduce(
        (acc, order) => acc + parseFloat(order.totalPrice) * 0.1,
        0
      );

      const deliveryPrice = statistics.totalDeliveredPrice * 0.02;

      setStatistics({
        orderedCount: ordered.length,
        onTransitCount: onTransit.length,
        deliveredCount: delivered.length,
        totalOrderedPrice: calculateTotalPrice(ordered),
        totalOnTransitPrice: calculateTotalPrice(onTransit),
        totalDeliveredPrice: calculateTotalPrice(delivered),
        originalProductPrice: originalPrice,
        taxedOrdersCount: taxedOrders.length,
        originalOrderedTotal: originalOrderedTotal,
        taxDeductedAmount: taxDeductedAmount,
        deliveryPrice: deliveryPrice,
      });
    }
  }, [orderHistory, statistics.totalDeliveredPrice]);

  if (isLoading) {
    return <Loader />;
  }

  // Bar chart Import

  const colors = scaleOrdinal(schemeCategory10).range();

  const barChartData = [
    {
      name: "Orders",
      uv: statistics.totalOrderedPrice,
    },
    {
      name: "Transit",
      uv: statistics.totalOnTransitPrice,
    },
    {
      name: "Delivered",
      uv: statistics.totalDeliveredPrice,
    },
    {
      name: "Taxed",
      uv: statistics.taxDeductedAmount,
    },
    {
      name: "Delivery Price",
      uv: statistics.deliveryPrice,
    },
  ];
  const PieChartData = [
    { name: "Delivered", value: statistics.totalDeliveredPrice },
    { name: "Taxed", value: statistics.taxDeductedAmount },
    { name: "Delivery Price", value: statistics.deliveryPrice },
  ];
  // Bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3} 
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  // Pie Chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div>
      <h1 className="my-10 text-center text-3xl font-bold text-blue-500">
        Statistics (ADM)
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-5 ml-5 text-black">
        <StatisticsCard
          icon={<FaShoppingBag />}
          title="Orders"
          count={statistics.orderedCount}
          amount={statistics.totalOrderedPrice}
        />
        <StatisticsCard
          icon={<FaShuttleVan />}
          title="On Transit"
          count={statistics.onTransitCount}
          amount={statistics.totalOnTransitPrice}
        />
        <StatisticsCard
          icon={<FaBox />}
          title="Delivered"
          count={statistics.deliveredCount}
          amount={statistics.totalDeliveredPrice}
        />
        <StatisticsCard
          icon={<FaMoneyBillAlt />}
          title="Original Ordered Total"
          amount={statistics.originalOrderedTotal}
        />
        <StatisticsCard
          icon={<FaMoneyBill />}
          title="Tax Deducted Amount"
          amount={statistics.taxDeductedAmount}
        />
        <StatisticsCard
          icon={<FaShuttleVan />}
          title="Delivery Price (2%)"
          amount={statistics.deliveryPrice}
        />
      </div>
      <div className="mt-10 bg-slate-100 shadow-xl flex justify-center items-center text-center">
        <div>
          <h1 className="my-10 text-3xl font-bold text-blue-500">
            Price chart
          </h1>
          {/* bar chart */}
          <BarChart
            width={500}
            height={300}
            data={barChartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar
              dataKey="uv"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {barChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
      <div>
        <div className="mt-10 bg-slate-100 shadow-xl flex justify-center items-center text-center">
          <div>
            <h1 className="my-10 text-3xl font-bold text-blue-500">
              Delivered Pie Chart
            </h1>
            {/* Pie chart */}
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={PieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {PieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h1 className="text-black">
              Delivered{" "}
              <span className="bg-[#0088FE] px-[20px] py-[2px] ml-4"></span>
            </h1>
            <h1 className="text-black">
              Taxed{" "}
              <span className="bg-[#00C49F] px-[20px] py-[2px] ml-4"></span>
            </h1>
            <h1 className="text-black">
              Delivery Price{" "}
              <span className="bg-[#FFBB28] px-[20px] py-[2px] ml-4"></span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmStatistics;
