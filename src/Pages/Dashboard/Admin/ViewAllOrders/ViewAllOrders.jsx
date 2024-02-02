import { useState } from "react";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader";

const ViewAllOrders = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderState, setSelectedOrderState] = useState("all"); // Default: "all"
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["viewAllOrders"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/OrderHistory`);
      return res.data;
    },
  });

  const reloadContents = () => {
    refetch();
  };

  const handleDeliver = async (orderId) => {
    try {
      // Make a PUT request to update the order state to "On Transit"
      await axiosPublic.put(`/OrderHistory/${orderId}`, {
        orderState: "On Transit",
      });

      // Trigger refetch for orders
      refetch();
    } catch (error) {
      console.error("Error delivering order:", error);
      // Handle error (show alert or log)
    }
  };

  const handleDelivered = async (orderId) => {
    try {
      // Make a PUT request to update the order state to "Delivered"
      await axiosPublic.put(`/OrderHistory/${orderId}`, {
        orderState: "Delivered",
      });

      // Trigger refetch for orders
      refetch();
    } catch (error) {
      console.error("Error delivering order:", error);
      // Handle error (show alert or log)
    }
  };

  const handleReject = async (orderId) => {
    try {
      // Make a PUT request to update the order state to "Rejected"
      await axiosPublic.put(`/OrderHistory/${orderId}`, {
        orderState: "Rejected",
      });

      // Trigger refetch for orders
      refetch();
    } catch (error) {
      console.error("Error rejecting order:", error);
      // Handle error (show alert or log)
    }
  };

  const openModal = (orderId) => {
    const order = orders.find((o) => o._id === orderId);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const handleSearch = (order) => {
    const isMatchingEmail = order.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isMatchingOrderState =
      selectedOrderState === "all" || order.orderState === selectedOrderState;

    return isMatchingEmail && isMatchingOrderState;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="my-10 text-center text-3xl font-bold text-blue-500">
        All Orders
      </h1>
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/5 ml-2 flex">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-l-md w-52"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="p-3 bg-green-500 hover:bg-green-400 text-white rounded-r-xl"
            onClick={reloadContents}
          >
            Search
          </button>
        </div>
        <div className="w-1/5 ml-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Order State
          </label>
          <select
            className="p-2 border border-gray-300 rounded-md w-full"
            value={selectedOrderState}
            onChange={(e) => setSelectedOrderState(e.target.value)}
          >
            <option value="all">All</option>
            <option value="ordered">Ordered</option>
            <option value="On Transit">On Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
      <div className="ml-2 text-black">
        <div className="overflow-x-auto">
          <table className="table bg-gray-200">
            <thead>
              <tr className="text-black text-[18px] font-semibold">
                <th>Email</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Order State</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((order) => handleSearch(order))
                .map((order) => (
                  <tr key={order._id}>
                    <td>{order.email}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.orderState}</td>
                    <td>
                      {order.orderState === "Ordered" && (
                        <>
                          <button
                            onClick={() => openModal(order._id)}
                            className="text-blue-500 hover:underline mr-2"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleDeliver(order._id)}
                            className="text-green-500 hover:underline mr-2"
                          >
                            Deliver
                          </button>
                          <button
                            onClick={() => handleReject(order._id)}
                            className="text-red-500 hover:underline"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {order.orderState === "On Transit" && (
                        <>
                          <button
                            onClick={() => openModal(order._id)}
                            className="text-blue-500 hover:underline mr-2"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleDelivered(order._id)}
                            className="text-red-500 hover:underline mr-2"
                          >
                            Delivered
                          </button>
                        </>
                      )}
                      {order.orderState === "Rejected" && (
                        <>
                          <button
                            onClick={() => openModal(order._id)}
                            className="text-blue-500 hover:underline mr-2"
                          >
                            View Details
                          </button>
                        </>
                      )}
                      {order.orderState === "Delivered" && (
                        <>
                          <button
                            onClick={() => openModal(order._id)}
                            className="text-blue-500 hover:underline mr-2"
                          >
                            View Details
                          </button>
                        </>
                      )}
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for displaying product details */}
      {selectedOrder && (
        <dialog id="my_modal_1" className="modal" open={isModalOpen}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Order Details</h3>
            <p>Email: {selectedOrder.email}</p>
            <p>Total Price: {selectedOrder.totalPrice}</p>
            <p>Order Date: {selectedOrder.orderDate}</p>
            <p>Order State: {selectedOrder.orderState}</p>
            <h4 className="font-bold mt-4">Products:</h4>
            <ul>
              {selectedOrder.products.map((product) => (
                <div key={product.id}>
                  <li className="flex">
                    <img
                      src={product.image}
                      alt=""
                      className="w-12 h-12 my-2 mr-5"
                    />
                    <p className="my-auto">Name: {product.name}</p>
                  </li>
                  <hr className="p-[1px] bg-red-500 " />
                </div>
              ))}
            </ul>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ViewAllOrders;
