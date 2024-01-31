import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import { useState, useEffect } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const Cart = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [payment, setPayment] = useState({
    totalProducts: 0,
    totalAmount: "0.00",
    tax: "0.00",
  });

  const {
    data: myCart = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myCart"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/PublicCart?buyer=${user.email}`);
      return res.data;
    },
  });

  // Effect to update payment state on myCart change
  useEffect(() => {
    const totalPrice = myCart.reduce((acc, item) => acc + item.price, 0);
    setPayment({
      totalProducts: myCart.length,
      totalAmount: totalPrice.toFixed(2),
      tax: (totalPrice * 0.1).toFixed(2),
    });
  }, [myCart]);

  const handleDelete = async (itemId) => {
    try {
      await axiosPublic.delete(`/PublicCart/${itemId}`);
      // Trigger refetch after successful deletion
      refetch();
    } catch (error) {
      console.error("Error deleting from cart:", error);
      // Handle error (show alert or log)
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="pt-28 max-w-[1200px] mx-auto mb-10">
      <h1 className="my-10 text-center text-3xl font-bold text-blue-500">
        My Cart
      </h1>
      <div className="flex justify-between items-center mb-4 max-w-[1200px]">
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
            onClick={() => refetch()}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-1 gap-5">
        {/* The list */}
        <div className="ml-2 text-black w-5/6">
          <div className="overflow-x-auto">
            <table className="table bg-gray-200">
              <thead>
                <tr className="text-black text-[18px] font-semibold">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myCart
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24"
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot className="text-xl text-black">
                <td></td>
                <td>Total:</td>
                <td>{payment.totalAmount}</td>
                <td></td>
              </tfoot>
            </table>
          </div>
        </div>
        {/* the payment booth */}
        <div className="bg-blue-500 w-1/6 h-80 p-4">
          <h1 className="text-white text-md font-bold mb-2">Payment Summary</h1>
          <div className="text-white">
            <p>Total Products: {payment.totalProducts}</p>
            <p>Total Price: ${payment.totalAmount}</p>
            <p>Tax (10%): ${payment.tax}</p>
            <hr className="my-2 border-white" />
            <p className="text-xl font-bold text-center">
              Grand Total: $
              {(
                parseFloat(payment.totalAmount) + parseFloat(payment.tax)
              ).toFixed(2)}
            </p>
          </div>
          <button className="mt-4 p-2 bg-white text-red-500 hover:bg-gray-200">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
