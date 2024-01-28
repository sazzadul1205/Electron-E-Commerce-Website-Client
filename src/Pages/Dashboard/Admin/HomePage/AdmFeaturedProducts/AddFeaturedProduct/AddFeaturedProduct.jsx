import Swal from "sweetalert2";
import useAxiosPublic from "../../../../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";

const AddFeaturedProduct = ({ onSuccess, onClose }) => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    const newProduct = {
      title: data.title,
      image: data.imageUrl,
    };

    axiosPublic
      .post("/featuredCategories", newProduct)
      .then((res) => {
        if (res.data.insertedId) {
          showSuccessAlert();
          onSuccess(); // Reload contents
          onClose(); // Close the modal
        }
      })
      .catch((error) => {
        console.log(error);
        showErrorAlert("Failed to add featured product.");
        onClose(); // Close the modal on failure
      });
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Product Added!",
      text: "New featured product has been added successfully.",
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
            className="input input-bordered"
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
            className="input input-bordered"
            required
          />
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

export default AddFeaturedProduct;
