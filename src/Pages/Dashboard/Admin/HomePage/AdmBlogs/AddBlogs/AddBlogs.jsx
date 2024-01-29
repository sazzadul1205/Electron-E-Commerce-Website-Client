import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../../../Hooks/useAxiosPublic";

const AddBlogs = ({ onSuccess, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const newBlogPost = {
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        image: data.imageUrl,
        link: data.link,
      };

      const response = await axiosPublic.post("/BlogPosts", newBlogPost);

      if (response.data.insertedId) {
        showSuccessAlert();
        onSuccess(); // Reload contents
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error(error);
      showErrorAlert("Failed to add a new blog post.");
      onClose(); // Close the modal on failure
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Blog Post Added!",
      text: "New blog post has been added successfully.",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const showErrorAlert = (errorMessage) => {
    Swal.fire({
      icon: "error",
      title: "Failed to Add Blog Post",
      text: errorMessage,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        {/* Blog Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Blog Title:
            </span>
          </label>
          <input
            type="text"
            {...register("title", { required: "Blog title is required" })}
            name="title"
            placeholder="Blog Title"
            className={`input input-bordered ${
              errors.title ? "input-error" : ""
            }`}
          />
          {errors.title && (
            <span className="error-message">{errors.title.message}</span>
          )}
        </div>
        {/* Blog Excerpt */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Blog Excerpt:
            </span>
          </label>
          <textarea
            {...register("excerpt", { required: "Blog excerpt is required" })}
            name="excerpt"
            placeholder="Blog Excerpt"
            className={`textarea textarea-bordered ${
              errors.excerpt ? "input-error" : ""
            }`}
          ></textarea>
          {errors.excerpt && (
            <span className="error-message">{errors.excerpt.message}</span>
          )}
        </div>
        {/* Blog Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Blog Date:
            </span>
          </label>
          <input
            type="date"
            {...register("date", { required: "Blog date is required" })}
            name="date"
            className={`input input-bordered ${
              errors.date ? "input-error" : ""
            }`}
          />
          {errors.date && (
            <span className="error-message">{errors.date.message}</span>
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
        {/* Blog Link */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Blog Link:
            </span>
          </label>
          <input
            type="url"
            {...register("link", { required: "Blog link is required" })}
            name="link"
            placeholder="Blog Link"
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
            value="Add Blog Post"
          />
        </div>
      </form>
    </div>
  );
};

export default AddBlogs;
