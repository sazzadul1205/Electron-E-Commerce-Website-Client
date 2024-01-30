import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const Cart = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: myCart = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myCart"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/PublicCart?email=${user.email}`);
      return res.data;
    },
  });

  const reloadContents = () => {
    refetch();
  };

  const handleDelete = async (itemId) => {
    try {
      await axiosPublic.delete(`/PublicCart/${itemId}`);
      reloadContents();
    } catch (error) {
      console.error("Error deleting from cart:", error);
      // Handle error (show alert or log)
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="pt-28 max-w-[1200px] mx-auto">
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
                <th>name</th>
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
