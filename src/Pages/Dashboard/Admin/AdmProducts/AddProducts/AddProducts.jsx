import Swal from "sweetalert2";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";

const AddProducts = ({ onSuccess, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    try {
      const newProduct = {
        name: data.name,
        image: data.imageUrl,
        price: parseFloat(data.price),
        rating: parseFloat(data.rating),
        discounts: data.discounts,
        description: data.description,
        arrival: data.arrival,
        bestSeller: data.bestSeller === "true",
        sold: parseInt(data.sold),
        brand: data.brand,
        productType: data.productType,
      };

      axiosPublic
        .post("/Products", newProduct)
        .then((res) => {
          if (res.data.insertedId) {
            showSuccessAlert();
            onSuccess(); // Reload contents
            onClose(); // Close the modal
          }
        })
        .catch((error) => {
          console.error(error);
          showErrorAlert("Failed to add product.");
          onClose(); // Close the modal on failure
        });
    } catch (error) {
      console.error(error);
      showErrorAlert("An error occurred. Please try again.");
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Product Added!",
      text: "New product has been added successfully.",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const showErrorAlert = (errorMessage) => {
    Swal.fire({
      icon: "error",
      title: "Failed to Add Product",
      text: errorMessage,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        {/* Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Name:
            </span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Product name is required" })}
            name="name"
            placeholder="Product name"
            className={`input input-bordered ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        {/* Image URL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Image URL:
            </span>
          </label>
          <input
            type="url"
            {...register("imageUrl", { required: "Image URL is required" })}
            name="imageUrl"
            placeholder="Image URL"
            className={`input input-bordered ${
              errors.imageUrl ? "border-red-500" : ""
            }`}
            required
          />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>
        {/* Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Price:
            </span>
          </label>
          <input
            type="number"
            {...register("price", { required: "Product Price is required" })}
            name="price"
            placeholder="Product Price"
            className={`input input-bordered ${
              errors.price ? "border-red-500" : ""
            }`}
            required
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>
        {/* Rating */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Rating:
            </span>
          </label>
          <input
            type="number"
            {...register("rating", { required: "Product Rating is required" })}
            name="rating"
            placeholder="Product Rating"
            className={`input input-bordered ${
              errors.rating ? "border-red-500" : ""
            }`}
            required
          />
          {errors.rating && (
            <p className="text-red-500">{errors.rating.message}</p>
          )}
        </div>
        {/* Discounts */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Discounts:
            </span>
          </label>
          <input
            type="number"
            {...register("discounts", {
              required: "Product Discounts is required",
            })}
            name="discounts"
            placeholder="Product Discounts"
            className={`input input-bordered ${
              errors.discounts ? "border-red-500" : ""
            }`}
            required
          />
          {errors.discounts && (
            <p className="text-red-500">{errors.discounts.message}</p>
          )}
        </div>
        {/* description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Description:
            </span>
          </label>
          <textarea
            name="description"
            className={`p-1 ${errors.description ? "border-red-500" : ""}`}
            id=""
            cols="30"
            rows="10"
            {...register("description", {
              required: "Product description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        {/* arrival */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Arrival:
            </span>
          </label>
          <select
            {...register("arrival", { required: "Arrival is required" })}
            name="arrival"
            className={`select w-full max-w-xs input input-bordered ${
              errors.arrival ? "border-red-500" : ""
            }`}
          >
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
          {errors.arrival && (
            <p className="text-red-500">{errors.arrival.message}</p>
          )}
        </div>
        {/* bestSeller */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Best Seller:
            </span>
          </label>
          <select
            {...register("bestSeller", { required: "Best Seller is required" })}
            name="bestSeller"
            className={`select w-full max-w-xs input input-bordered ${
              errors.bestSeller ? "border-red-500" : ""
            }`}
          >
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
          {errors.bestSeller && (
            <p className="text-red-500">{errors.bestSeller.message}</p>
          )}
        </div>
        {/* sold */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Sold:
            </span>
          </label>
          <input
            type="number"
            {...register("sold", { required: "Product sold is required" })}
            name="sold"
            placeholder="Product sold"
            className={`input input-bordered ${
              errors.sold ? "border-red-500" : ""
            }`}
            required
          />
          {errors.sold && <p className="text-red-500">{errors.sold.message}</p>}
        </div>
        {/* Brand */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Brand:
            </span>
          </label>
          <input
            type="text"
            {...register("brand", { required: "Product Brand is required" })}
            name="brand"
            placeholder="Product Brand"
            className={`input input-bordered ${
              errors.brand ? "border-red-500" : ""
            }`}
            required
          />
          {errors.brand && (
            <p className="text-red-500">{errors.brand.message}</p>
          )}
        </div>
        {/* productType */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Product Type:
            </span>
          </label>
          <input
            type="text"
            {...register("productType", {
              required: "Product Type is required",
            })}
            name="productType"
            placeholder="Product Type"
            className={`input input-bordered ${
              errors.productType ? "border-red-500" : ""
            }`}
            required
          />
          {errors.productType && (
            <p className="text-red-500">{errors.productType.message}</p>
          )}
        </div>
        {/* Submit */}
        <div className="form-control mt-6 text-white">
          <input
            className={`w-full p-3 bg-blue-500 hover:bg-blue-400 rounded-xl mt-5`}
            type="submit"
            value="Add Product"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
