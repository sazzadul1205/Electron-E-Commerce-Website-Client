import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../../../Hooks/useAxiosPublic";
import useAuth from "../../../../../../Hooks/useAuth";

const AddBlogs = ({ onSuccess, onClose }) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const onSubmit = async (data) => {
    try {
      const newBlogPost = {
        title: data.title,
        author: user.displayName,
        excerpt: data.excerpt,
        date: data.date,
        image: data.imageUrl,
        likes: data.likes,
        ratings: parseFloat(data.Rating),
        reviewCount: data.reviewCount,
        tags,
        postedBy:user.email,
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

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagAdd = () => {
    const tag = tagInput.trim();

    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
      setValue("tags", [...tags, tag]);
    }
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setValue("tags", updatedTags);
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
        {/* Likes */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Likes:
            </span>
          </label>
          <input
            type="number"
            {...register("likes", { required: "Likes is required" })}
            name="likes"
            placeholder="Amount Of Likes"
            className={`input input-bordered ${
              errors.likes ? "input-error" : ""
            }`}
          />
          {errors.likes && (
            <span className="error-message">{errors.likes.message}</span>
          )}
        </div>
        {/* Rating URL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Rating:
            </span>
          </label>
          <input
            type="float"
            {...register("Rating", { required: "Rating is required" })}
            name="Rating"
            placeholder="Rating"
            className={`input input-bordered ${
              errors.Rating ? "input-error" : ""
            }`}
          />
          {errors.Rating && (
            <span className="error-message">{errors.Rating.message}</span>
          )}
        </div>
        {/* Review Count */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Review Count:
            </span>
          </label>
          <input
            type="number"
            {...register("reviewCount", {
              required: "Review Count is required",
            })}
            name="reviewCount"
            placeholder="Review Count"
            className={`input input-bordered ${
              errors.reviewCount ? "input-error" : ""
            }`}
          />
          {errors.reviewCount && (
            <span className="error-message">{errors.reviewCount.message}</span>
          )}
        </div>
        {/* Tags */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Tags:
            </span>
          </label>
          <div className="flex flex-wrap space-x-2 items-center">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-blue-500 text-white px-2 py-1 rounded-full mb-2"
              >
                {tag}
                <span
                  className="ml-2 cursor-pointer"
                  onClick={() => handleTagRemove(tag)}
                >
                  &#10006;
                </span>
              </div>
            ))}
          </div>
          <div className="flex space-x-2 items-center mt-2">
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              placeholder="Add Tags"
              className={`input input-bordered ${
                errors.tags ? "input-error" : ""
              }`}
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
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
