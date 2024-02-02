import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";

const AddFAQs = ({ onSuccess, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    try {
      const newFAQ = {
        question: data.question,
        answer: data.answer,
      };

      axiosPublic
        .post("/FAQs", newFAQ)  // Adjusted API endpoint
        .then((res) => {
          if (res.data.insertedId) {
            showSuccessAlert();
            onSuccess(); // Reload contents
            onClose(); // Close the modal
          }
        })
        .catch((error) => {
          console.error(error);
          showErrorAlert("Failed to add FAQ.");
          onClose(); // Close the modal on failure
        });
    } catch (error) {
      console.error(error);
      showErrorAlert("An error occurred. Please try again.");
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "FAQ Added!",
      text: "New FAQ has been added successfully.",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const showErrorAlert = (errorMessage) => {
    Swal.fire({
      icon: "error",
      title: "Failed to Add FAQ",
      text: errorMessage,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        {/* Question */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Question:
            </span>
          </label>
          <input
            type="text"
            {...register("question", { required: "Question is required" })}
            name="question"
            placeholder="Question"
            className={`input input-bordered ${
              errors.question ? "border-red-500" : ""
            }`}
          />
          {errors.question && <p className="text-red-500">{errors.question.message}</p>}
        </div>
        {/* Answer */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-500 text-lg font-semibold">
              Answer:
            </span>
          </label>
          <textarea
            {...register("answer", { required: "Answer is required" })}
            name="answer"
            placeholder="Answer"
            className={`textarea textarea-bordered ${
              errors.answer ? "border-red-500" : ""
            }`}
          />
          {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}
        </div>
        {/* Submit */}
        <div className="form-control mt-6 text-white">
          <input
            className={`w-full p-3 bg-blue-500 hover:bg-blue-400 rounded-xl mt-5`}
            type="submit"
            value="Add FAQ"
          />
        </div>
      </form>
    </div>
  );
};

export default AddFAQs;
