import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const UpdateFeaturedProducts = ({ category, onSuccess, onClose }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: category.title,
      imageUrl: category.image,
    },
  });
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    const updatedProduct = {
      title: data.title,
      image: data.imageUrl,
    };

    axiosPublic
      .put(`/featuredCategories/${category._id}`, updatedProduct)
      .then((res) => {
        if (res.data.modifiedCount == 1) {
          showSuccessAlert();
          onSuccess(); // Reload contents
          onClose(); // Close the modal
        }
      })
      .catch((error) => {
        console.log(error);
        showErrorAlert("Failed to update featured product.");
        onClose(); // Close the modal on failure
      });
  };
  const showSuccessAlert = () => {
    Swal.fire({
      title: "Product Updated!",
      text: "Featured product has been updated successfully.",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const showErrorAlert = (errorMessage) => {
    Swal.fire({
      icon: "error",
      title: "Failed to Update Product",
      text: errorMessage,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Title:
            </span>
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            name="title"
            placeholder="Product Title"
            className="input input-bordered text-white"
          />
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
            {...register("imageUrl", { required: true })}
            name="imageUrl"
            placeholder="Image URL"
            className="input input-bordered text-white"
            required
          />
        </div>
        {/* Submit */}
        <div className="form-control mt-6 text-white">
          <input
            className={`w-full p-3 bg-blue-500 hover:bg-blue-400 rounded-xl mt-5`}
            type="submit"
            value="Update Product"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateFeaturedProducts;
