import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Title from "../../Components/Title";
import { CiShoppingCart } from "react-icons/ci";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const NewArrivals = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const currentDate = new Date();
  const formattedDateTime = currentDate.toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const { data: productsNew = [], isLoading } = useQuery({
    queryKey: ["productsNew"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products?arrival=new`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  const shuffledProducts = productsNew.sort(() => Math.random() - 0.5);

  const randomNewArrivals = shuffledProducts.slice(0, 4);

  const handleAddToCart = async (product) => {
    try {
      if (!user) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login first to add items to your cart.",
          confirmButtonText: "leave",
        });
        return;
      }
      const ChosenProduct = {
        name: product.name,
        image: product.image,
        price: product.price,
        buyer: user.email,
        buyingDate: formattedDateTime,
      };
      // Make the API call to add the product to the cart
      await axiosPublic.post("/publicCart", ChosenProduct);

      // Show success message using SweetAlert
      Swal.fire({
        icon: "success",
        title: `${product.name} added to cart successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // Handle error and show error message using SweetAlert
      console.error("Error adding to cart:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <div className="bg-gray-200 pb-5">
      <Title
        title={"New Arrivals"}
        subtitle={"Discover the latest products in our inventory."}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-8 mt-6 max-w-[1200px] mx-auto pb-5">
        {randomNewArrivals.map((product) => (
          <div
            key={product.id}
            className="relative bg-white p-6 rounded-lg shadow-md"
          >
            {product.arrival === "new" && (
              <div className="absolute top-0 left-0 bg-blue-500 text-white py-1 px-2 rounded-tl-lg rounded-br-lg">
                New Arrival
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="card mb-4 rounded-md w-44 h-44 mx-auto relative"
            />
            <h3 className="text-xl font-semibold mb-2 h-28">{product.name}</h3>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-gray-700 mb-2">
              ${parseFloat(product.price).toFixed(2)}
            </p>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">
                <Rating
                  style={{ maxWidth: 120 }}
                  value={product.rating}
                  readOnly
                />
              </span>
              <span className="ml-2 text-gray-500 text-sm">
                ({product.reviews} reviews)
              </span>
            </div>
            <div className="flex justify-center mt-2">
              <button
                className="bg-red-500 hover:bg-red-400 text-white rounded-lg w-full p-2 flex items-center justify-center"
                onClick={() => handleAddToCart(product)}
              >
                <h1 className="text-center">Add to Cart</h1>
                <CiShoppingCart className="text-2xl ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
