import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddFeaturedBrands = ({ onSuccess, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const newBrand = {
        name: data.name,
        image: data.imageUrl,
        link: data.link,
      };

      const response = await axiosPublic.post("/featuredBrands", newBrand);

      if (response.data.insertedId) {
        showSuccessAlert();
        onSuccess(); // Reload contents
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error(error);
      showErrorAlert("Failed to add featured brand.");
      onClose(); // Close the modal on failure
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Brand Added!",
      text: "New featured brand has been added successfully.",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const showErrorAlert = (errorMessage) => {
    Swal.fire({
      icon: "error",
      title: "Failed to Add Brand",
      text: errorMessage,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        {/* Brand Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Brand Name:
            </span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Brand name is required" })}
            name="name"
            placeholder="Brand Name"
            className={`input input-bordered ${
              errors.name ? "input-error" : ""
            }`}
          />
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
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
              errors.imageUrl ? "input-error" : ""
            }`}
          />
          {errors.imageUrl && (
            <span className="error-message">{errors.imageUrl.message}</span>
          )}
        </div>
        {/* Brand Link */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Brand Link:
            </span>
          </label>
          <input
            type="url"
            {...register("link", { required: "Brand link is required" })}
            name="link"
            placeholder="Brand Link"
            className={`input input-bordered ${
              errors.link ? "input-error" : ""
            }`}
          />
          {errors.link && (
            <span className="error-message">{errors.link.message}</span>
          )}
        </div>
        {/* Submit */}
        <div className="form-control mt-6 text-white">
          <input
            className={`w-full p-3 bg-blue-500 hover:bg-blue-400 rounded-xl mt-5`}
            type="submit"
            value="Add Brand"
          />
        </div>
      </form>
    </div>
  );
};

export default AddFeaturedBrands;
