import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import Loader from "../../../../Components/Loader";
import AddFeaturedProduct from "./AddFeaturedProduct/AddFeaturedProduct";
import UpdateFeaturedProducts from "./UpdateFeaturedProducts/UpdateFeaturedProducts";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdmFeaturedProducts = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: admFeaturedCategories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admFeaturedCategories"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/featuredCategories`);
      return res.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = admFeaturedCategories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (productId, productName) => {
    try {
      const result = await showConfirmationAlert(
        "Are you sure?",
        `You are about to delete "${productName}". This action cannot be undone.`,
        "Delete"
      );

      if (result.isConfirmed) {
        await axiosPublic.delete(`/featuredCategories/${productId}`);
        refetch();
        showSuccessAlert(
          "Product Deleted!",
          "Featured product deleted successfully."
        );
      }
    } catch (error) {
      console.error(error);
      showErrorAlert(
        "Failed to Delete Product",
        "An error occurred while deleting the featured product."
      );
    }
  };

  const reloadContents = () => {
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="my-10 text-center text-3xl font-bold text-blue-500">
        Featured Products
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
            onClick={() => setSearchTerm(searchTerm)}
          >
            Search
          </button>
        </div>
        <button
          className="p-3 bg-green-500 hover.bg-green-400 text-white rounded-xl"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          + Add Featured Products
        </button>
      </div>
      <div className="ml-2 text-black">
        <div className="overflow-x-auto">
          <table className="table bg-gray-200">
            <thead>
              <tr className="text-black text-[18px] font-semibold">
                <th>Image</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category._id}>
                  <td>
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-12 h-12"
                    />
                  </td>
                  <td>{category.title}</td>
                  <td className="flex gap-2">
                    <button
                      className="px-5 py-3 bg-yellow-500 hover:bg-yellow-400 text-white rounded-xl"
                      onClick={() =>
                        document
                          .getElementById(`my_modal_2_${category._id}`)
                          .showModal()
                      }
                    >
                      <FaEdit className="text-lg " />
                    </button>
                    {/* update product modal */}
                    <dialog id={`my_modal_2_${category._id}`} className="modal">
                      <div className="modal-box bg-white">
                        <div className="modal-action">
                          <form method="dialog">
                            <button
                              className="text-3xl font-bold mr-5 text-red-500"
                              onClick={() =>
                                document
                                  .getElementById(`my_modal_2_${category._id}`)
                                  .close()
                              }
                            >
                              x
                            </button>
                          </form>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-center text-black">
                            Update Product
                          </h3>
                        </div>
                        <UpdateFeaturedProducts
                          key={category._id}
                          category={category} // Pass the entire category object
                          onSuccess={reloadContents}
                          onClose={() =>
                            document
                              .getElementById(`my_modal_2_${category._id}`)
                              .close()
                          }
                        />
                      </div>
                    </dialog>

                    <button
                      className=" px-5 bg-red-500 hover:bg-red-400 text-white rounded-xl"
                      onClick={() => handleDelete(category._id, category.title)}
                    >
                      <FaTrash className="text-xl"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modals */}
      {/* Add Product Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white">
          <div className="modal-action">
            <form method="dialog">
              <button
                className="text-3xl font-bold mr-5 text-red-500"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                x
              </button>
            </form>
          </div>
          <div>
            <h3 className="font-bold text-lg text-center text-black">
              Add New Product
            </h3>
          </div>
          <AddFeaturedProduct
            onSuccess={reloadContents}
            onClose={() => document.getElementById("my_modal_1").close()}
          />
        </div>
      </dialog>
    </div>
  );
};

export default AdmFeaturedProducts;

// Sweet Alerts

const showSuccessAlert = (title, text) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

const showErrorAlert = (title, text) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
  });
};

const showConfirmationAlert = (title, text, confirmButtonText) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText || "Yes, proceed!",
  });
};
