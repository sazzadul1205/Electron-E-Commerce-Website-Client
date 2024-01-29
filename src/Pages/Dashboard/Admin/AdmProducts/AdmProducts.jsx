import { FaEdit, FaTrash } from "react-icons/fa";
import { SlScreenDesktop } from "react-icons/sl";
import Loader from "../../../Components/Loader";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import AddProducts from "./AddProducts/AddProducts";
import ViewProducts from "./ViewProducts/ViewProducts";
import EditProducts from "./EditProducts/EditProducts";

const AdmProducts = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: Products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Products"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/Products`);
      return res.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedProductType, setSelectedProductType] = useState("All");

  const uniqueBrands = [
    "All",
    ...new Set(Products.map((category) => category.brand)),
  ];

  const uniqueProductTypes = [
    "All",
    ...new Set(Products.map((category) => category.productType)),
  ];

  const filteredProducts = Products.filter((category) => {
    const byBrand = selectedBrand === "All" || category.brand === selectedBrand;
    const byProductType =
      selectedProductType === "All" ||
      category.productType === selectedProductType;
    const bySearchTerm = category.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return byBrand && byProductType && bySearchTerm;
  });

  const handleDelete = async (productId, productName) => {
    try {
      const result = await showConfirmationAlert(
        "Are you sure?",
        `You are about to delete "${productName}". This action cannot be undone.`,
        "Delete"
      );

      if (result.isConfirmed) {
        await axiosPublic.delete(`/products/${productId}`);
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
    // Assuming you have some logic here to refetch the initial data
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mb-10">
      <h1 className="my-10 text-center text-3xl font-bold text-blue-500 ">
        Products
      </h1>
      <div className="ml-3 mb-2 flex">
        <h1 className="text-xl text-blue-500">Brands:</h1>
        <h1 className="text-xl text-blue-500 ml-14">Product Types:</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/5 ml-2 flex">
          {/* Dropdown for Brands */}
          <select
            className="p-2 border border-gray-300 bg-blue-500 text-white rounded-l-md w-32"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          {/* Dropdown for Product Types */}
          <select
            className="p-2 border border-gray-300 bg-blue-500 text-white rounded-l-md w-40 ml-2"
            value={selectedProductType}
            onChange={(e) => setSelectedProductType(e.target.value)}
          >
            {uniqueProductTypes.map((productType) => (
              <option key={productType} value={productType}>
                {productType}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-r-md w-52"
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
          + Add Products
        </button>
      </div>
      <div className="ml-2 text-black">
        <div className="overflow-x-auto">
          <table className="table bg-gray-200">
            <thead>
              <tr className="text-black text-[18px] font-semibold">
                <th>Image</th>
                <th>name</th>
                <th>Brand</th>
                <th>Product Type</th> {/* Added Product Type column */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((category) => (
                <tr key={category._id}>
                  <td>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-12 h-12"
                    />
                  </td>
                  <td>{category.name}</td>
                  <td>{category.brand}</td>
                  <td>{category.productType}</td>{" "}
                  {/* Added Product Type column */}
                  <td className="flex gap-2">
                    <button
                      className="px-5 py-4 bg-yellow-500 hover:bg-yellow-400 text-white rounded-xl"
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
                        <EditProducts
                          key={category._id}
                          product={category} // Pass the entire category object
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
                      className="px-5 py-4 bg-red-500 hover:bg-red-400 text-white rounded-xl"
                      onClick={() => handleDelete(category._id, category.name)}
                    >
                      <FaTrash className="text-xl" />
                    </button>
                    {/* View Button */}
                    <button
                      className="px-5 py-4  bg-green-500 hover:bg-green-400 text-white rounded-xl"
                      onClick={() =>
                        document
                          .getElementById(`my_modal_3_${category._id}`)
                          .showModal()
                      }
                    >
                      <SlScreenDesktop className="text-xl" />
                    </button>
                    {/* view product modal */}
                    <dialog id={`my_modal_3_${category._id}`} className="modal">
                      <div className="modal-box bg-white ">
                        <div className="modal-action">
                          <form method="dialog">
                            <button
                              className="text-3xl font-bold mr-5 text-red-500"
                              onClick={() =>
                                document
                                  .getElementById(`my_modal_3_${category._id}`)
                                  .close()
                              }
                            >
                              x
                            </button>
                          </form>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-center text-black">
                            View Product
                          </h3>
                        </div>
                        <ViewProducts
                          key={category._id}
                          product={category} // Pass the entire category object
                        />
                      </div>
                    </dialog>
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
              Add New Offer
            </h3>
          </div>
          <AddProducts
            onSuccess={reloadContents}
            onClose={() => document.getElementById("my_modal_1").close()}
          />
        </div>
      </dialog>
    </div>
  );
};

export default AdmProducts;

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
