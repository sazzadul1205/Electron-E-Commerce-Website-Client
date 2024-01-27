import { useForm } from "react-hook-form";
import Title from "../../Components/Title";
import "./NewsletterSignup.css";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const NewsletterSignup = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();

  const currentDate = new Date();
  const formattedDateTime = currentDate.toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const onSubmit = (data) => {
    console.log(data);
    const Subscriber = {
      name: data.name,
      email: data.email,
      date: formattedDateTime,
    };

    axiosPublic
      .post("/newsLetter", Subscriber)
      .then((res) => {
        if (res.data.insertedId) {
          showSuccessAlert();
        }
      })
      .catch((error) => {
        console.log(error);
        showErrorAlert("Failed to update user profile.");
      });
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Subscription Successful!",
      text: `Thank you! You are now a new News Letter subscribed.`,
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };
  const showErrorAlert = (errorMessage) => {
    Swal.fire({
      icon: "error",
      title: "News Letter Sign Up Failed",
      text: errorMessage,
    });
  };

  return (
    <div className=" Newsletter-item bg-fixed">
      <Title
        title={"Subscribe to Our Newsletter"}
        subtitle={
          "Sign up for our newsletter to receive exclusive offers, updates, and more."
        }
      ></Title>
      <div className="mx-[200px]">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="flex gap-5">
            {/* Name */}
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text text-blue-500 text-xl font-semibold">
                  Name
                </span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
              />
            </div>
            {/* Email */}
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text text-blue-500 text-xl font-semibold">
                  Email
                </span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                placeholder="Your Email"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control mt-6 text-white">
            <input
              className={`bg-blue-500 hover:bg-blue-300 text-white rounded-lg w-full p-2 flex items-center justify-center`}
              type="submit"
              value="Subscribe"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
