// ... (imports remain unchanged)

import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useState } from "react";

const MyOrders = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const {
    data: myOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["viewAllOrders"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/OrderHistory?email=${user.email}`);
      return res.data;
    },
  });

  const reloadContents = () => {
    refetch();
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
    const order = myOrders.find((o) => o._id === orderId);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const handleSearch = (order) => {
    // Modify this function according to your search criteria
    const isMatching = order.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // Add more conditions if needed

    return isMatching;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="my-10 text-center text-3xl font-bold text-blue-500">
        My Orders
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
              {myOrders
                .filter((order) => handleSearch(order))
                .map((order) => (
                  <tr key={order._id}>
                    <td>{order.email}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.orderState}</td>
                    <td>
                      {order.orderState === "ordered" && (
                        <>
                          <button
                            onClick={() => openModal(order._id)}
                            className="text-blue-500 hover:underline mr-2"
                          >
                            View Details
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

export default MyOrders;
