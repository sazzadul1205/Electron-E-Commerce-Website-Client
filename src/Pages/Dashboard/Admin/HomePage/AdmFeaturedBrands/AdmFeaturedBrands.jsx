import Swal from "sweetalert2";
import Loader from "../../../../Components/Loader";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import AddFeaturedBrands from "./AddFeaturedBrands/AddFeaturedBrands";
import { FaTrash } from "react-icons/fa";

const AdmFeaturedBrands = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: featuredBrands = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["featuredBrands"],
    queryFn: async () => {
      const res = await axiosPublic.get("/featuredBrands");
      return res.data;
    },
  });

  const [searchName, setSearchName] = useState("");

  const filteredBrands = featuredBrands.filter((brand) =>
    brand.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const handleDelete = async (brandId, brandName) => {
    try {
      const result = await showConfirmationAlert(
        "Are you sure?",
        `You are about to delete the brand "${brandName}". This action cannot be undone.`,
        "Delete"
      );

      if (result.isConfirmed) {
        await axiosPublic.delete(`/featuredBrands/${brandId}`);
        refetch();
        showSuccessAlert("Brand Deleted!", "Brand deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      showErrorAlert(
        "Failed to Delete Brand",
        "An error occurred while deleting the brand."
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
        Featured Brands
      </h1>
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/5 ml-2 flex">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-l-md w-52"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button
            className="p-3 bg-green-500 hover:bg-green-400 text-white rounded-r-xl"
            onClick={() => setSearchName(searchName)}
          >
            Search
          </button>
        </div>
        <button
          className="p-3 bg-green-500 hover.bg-green-400 text-white rounded-xl"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          + Add Featured Brands
        </button>
      </div>
      <div className="ml-2 text-black">
        <div className="overflow-x-auto">
          <table className="table bg-gray-200">
            <thead>
              <tr className="text-black text-[18px] font-semibold">
                <th>Image</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((brand) => (
                <tr key={brand._id}>
                  <td>
                    <img
                      src={brand.image}
                      alt={`${brand.name}'s Logo`}
                      className="w-12 h-12"
                    />
                  </td>
                  <td>{brand.name}</td>
                  <td className="flex gap-2">
                    <button
                      className="px-5 py-4 bg-red-500 hover:bg-red-400 text-white rounded-xl"
                      onClick={() => handleDelete(brand._id, brand.name)}
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
          <AddFeaturedBrands
            onSuccess={reloadContents}
            onClose={() => document.getElementById("my_modal_1").close()}
          />
        </div>
      </dialog>
    </div>
  );
};

export default AdmFeaturedBrands;

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
