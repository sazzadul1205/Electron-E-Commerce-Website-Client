import React, { useEffect, useState } from "react";
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

const AdmStatistics = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: orderHistory = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orderHistory"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/OrderHistory`);
      return res.data;
    },
  });

  const [orderedCount, setOrderedCount] = useState(0);
  const [onTransitCount, setOnTransitCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [totalOrderedPrice, setTotalOrderedPrice] = useState(0);
  const [totalOnTransitPrice, setTotalOnTransitPrice] = useState(0);
  const [totalDeliveredPrice, setTotalDeliveredPrice] = useState(0);
  const [originalProductPrice, setOriginalProductPrice] = useState(0);
  const [taxedOrdersCount, setTaxedOrdersCount] = useState(0);

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

      setOrderedCount(ordered.length);
      setOnTransitCount(onTransit.length);
      setDeliveredCount(delivered.length);

      const calculateTotalPrice = (orders) =>
        orders.reduce((acc, order) => acc + parseFloat(order.totalPrice), 0);

      setTotalOrderedPrice(calculateTotalPrice(ordered));
      setTotalOnTransitPrice(calculateTotalPrice(onTransit));
      setTotalDeliveredPrice(calculateTotalPrice(delivered));

      // Calculate Original Product Price
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
      setOriginalProductPrice(originalPrice);

      // Calculate Taxed Orders Count
      const taxedOrders = delivered.filter(
        (order) => parseFloat(order.totalPrice) * 0.1 > 0
      );
      setTaxedOrdersCount(taxedOrders.length);
    }
  }, [orderHistory]);

  const reloadContents = () => {
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="my-10 text-center text-3xl font-bold text-blue-500">
        Statistics (ADM)
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-5 ml-5 text-black">
        <div className="bg-[#faf8f7] shadow-xl flex p-5">
          <FaShoppingBag className="mr-5 text-4xl" />
          <div>
            <h1 className="text-lg">Orders: {orderedCount}</h1>
            <h1 className="text-lg mt-5">
              Order Amount:{" "}
              <span className="text-red-400">
                $ {totalOrderedPrice.toFixed(2)}
              </span>
            </h1>
          </div>
        </div>
        <div className="bg-[#faf8f7] shadow-xl flex p-5">
          <FaShuttleVan className="mr-5 text-4xl" />
          <div>
            <h1 className="text-lg">On Transit: {onTransitCount}</h1>
            <h1 className="text-lg mt-5">
              On Transit Amount:{" "}
              <span className="text-red-400">
                $ {totalOnTransitPrice.toFixed(2)}
              </span>
            </h1>
          </div>
        </div>
        <div className="bg-[#faf8f7] shadow-xl flex p-5">
          <FaBox className="mr-5 text-4xl" />
          <div>
            <h1 className="text-lg">Delivered: {deliveredCount}</h1>
            <h1 className="text-lg mt-5">
              Delivered Amount:{" "}
              <span className="text-red-400">
                $ {totalDeliveredPrice.toFixed(2)}
              </span>
            </h1>
          </div>
        </div>
        <div className="bg-[#faf8f7] shadow-xl flex p-5">
          <FaMoneyBillAlt className="mr-5 text-4xl" />
          <div>
            <h1 className="text-lg">Original Product Price</h1>
            <h1 className="text-lg mt-5">
              Amount:{" "}
              <span className="text-red-400">
                $ {originalProductPrice.toFixed(2)}
              </span>
            </h1>
          </div>
        </div>
        <div className="bg-[#faf8f7] shadow-xl flex p-5">
          <FaMoneyBill className="mr-5 text-4xl" />
          <div>
            <h1 className="text-lg">Taxed Orders</h1>
            <h1 className="text-lg mt-5">
              Count: <span className="text-red-400">{taxedOrdersCount}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmStatistics;
