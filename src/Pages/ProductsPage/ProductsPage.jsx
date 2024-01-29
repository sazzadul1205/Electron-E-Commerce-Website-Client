import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import ViewProducts from "../Dashboard/Admin/AdmProducts/ViewProducts/ViewProducts";
import { SlScreenDesktop } from "react-icons/sl";

const ProductsPage = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedArrival, setSelectedArrival] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ProductPerPage = 12;

  const {
    data: PublicProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["PublicProducts", currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/Products?page=${currentPage}&size=${ProductPerPage}`
      );
      return res.data;
    },
  });

  const reloadContents = () => {
    refetch();
  };

  const { data: productsCount = [], isLoading: isLoadingProductsCount } =
    useQuery({
      queryKey: ["productsCount"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/productsCount`);
        return res.data;
      },
    });

  const numberOfPages = Math.ceil(productsCount.count / ProductPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // Get unique brands and product types for dynamic options
  const uniqueBrands = [
    ...new Set(PublicProducts.map((product) => product.brand)),
  ];
  const uniqueProductTypes = [
    ...new Set(PublicProducts.map((product) => product.productType)),
  ];

  const filteredProducts = PublicProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBrand === "" ||
        product.brand.toLowerCase() === selectedBrand.toLowerCase()) &&
      (selectedArrival === "" ||
        product.arrival.toLowerCase() === selectedArrival.toLowerCase()) &&
      (selectedProductType === "" ||
        product.productType.toLowerCase() === selectedProductType.toLowerCase())
  );

  if (isLoading && isLoadingProductsCount) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto pt-32 ">
      <div className="flex items-center justify-center py-5 bg-gray-400">
        <div className="max-w-[1200px] text-white">
          <input
            type="text"
            placeholder="Search by product name"
            className="p-5 border border-gray-300 rounded-l-xl w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-400 p-5 rounded-r-xl"
            onClick={reloadContents}
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex justify-around items-center mb-4 max-w-[1200px] mx-auto mt-5">
        <div className="flex gap-4">
          <select
            className="p-2 border border-gray-300 rounded-md w-52"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <select
            className="p-2 border border-gray-300 rounded-md w-52"
            value={selectedArrival}
            onChange={(e) => setSelectedArrival(e.target.value)}
          >
            <option value="">All Arrival</option>
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>

          <select
            className="p-2 border border-gray-300 rounded-md w-52"
            value={selectedProductType}
            onChange={(e) => setSelectedProductType(e.target.value)}
          >
            <option value="">All Product Types</option>
            {uniqueProductTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Page changing */}
      <div
        className="join my-5 "
        style={{ display: "flex", justifyContent: "right" }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="join-item btn bg-blue-500 hover:bg-blue-200 text-white "
          disabled={currentPage === 1}
        >
          «
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page + 1)}
            key={page}
            className={`join-item btn bg-blue-200 text-white border-none ${
              currentPage === page + 1 && "bg-blue-500 border border-black"
            }`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, numberOfPages))
          }
          className="join-item btn bg-blue-500 hover:bg-blue-200 text-white "
          disabled={currentPage === numberOfPages}
        >
          »
        </button>
      </div>

      <div className=" bg-gray-200 py-5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="card card-compact w-72 bg-white text-black shadow-xl"
            >
              <figure>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>

                <p className="text-red-500">Price: {product.price}$</p>
                <div className="card-actions justify-between">
                  {/* View Button */}
                  <button
                    className="px-5 py-4  bg-green-500 hover:bg-green-400 text-white rounded-xl"
                    onClick={() =>
                      document
                        .getElementById(`my_modal_3_${product._id}`)
                        .showModal()
                    }
                  >
                    <SlScreenDesktop className="text-xl" />
                  </button>
                  <dialog id={`my_modal_3_${product._id}`} className="modal">
                    <div className="modal-box bg-white ">
                      <div className="modal-action">
                        <form method="dialog">
                          <button
                            className="text-3xl font-bold mr-5 text-red-500"
                            onClick={() =>
                              document
                                .getElementById(`my_modal_3_${product._id}`)
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
                        key={product._id}
                        product={product} // Pass the entire category object
                      />
                    </div>
                  </dialog>
                  <button className="bg-red-500 hover:bg-red-400 p-3 rounded-xl text-white px-8">
                    Add To cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Page changing */}
      <div
        className="join my-5 "
        style={{ display: "flex", justifyContent: "right" }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="join-item btn bg-blue-500 hover:bg-blue-200 text-white "
          disabled={currentPage === 1}
        >
          «
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page + 1)}
            key={page}
            className={`join-item btn bg-blue-200 text-white border-none ${
              currentPage === page + 1 && "bg-blue-500 border border-black"
            }`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, numberOfPages))
          }
          className="join-item btn bg-blue-500 hover:bg-blue-200 text-white "
          disabled={currentPage === numberOfPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
