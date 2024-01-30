import { Link, useNavigate } from "react-router-dom";
import background from "../../assets/background.jpg";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../Components/SocialLogin";

const SignUp = () => {
  const { createUser, updateUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };

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
    const UserData = {
      name: data.name,
      email: data.email,
      password:data.password,
      role: "member",
      creationTime: formattedDateTime,
    };
    createUser(data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        updateUser(data.name, data.photoURL)
          .then(() => {
            axiosPublic
              .post("/users", UserData)
              .then((res) => {
                if (res.data.insertedId) {
                  showSuccessAlert();
                  reset();
                  navigate("/");
                }
              })
              .catch((error) => {
                console.log(error);
                showErrorAlert("Failed to update user profile.");
              });
          })
          .catch((error) => {
            console.log(error);
            showErrorAlert("Failed to update user profile.");
          });
      })
      .catch((error) => {
        console.log(error);
        showErrorAlert(error.message);
      });
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Sign Up Successful!",
      text: "You are now a user Welcome.",
    });
  };

  const showErrorAlert = (errorMessage) => {
    Swal.fire({
      icon: "error",
      title: "Sign Up Failed",
      text: errorMessage,
    });
  };

  return (
    <div style={styles}>
      <Link to={"/"}>
        <button className="text-2xl font-bold flex pt-5 pl-5 text-black">
          <FaArrowLeft className=" text-3xl pr-2" />
          Back
        </button>
      </Link>
      <div className="hero-content mx-auto mt-14 text-white ">
        <div className="card w-72 md:w-[500px] max-w-md shadow-2xl opacity-90">
          <h1 className="text-4xl font-bold text-center text-blue-500">
            Sign Up Now
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-blue-500 text-lg font-semibold">
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
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-blue-500 text-lg font-semibold">
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
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-blue-500 text-lg font-semibold">
                  Photo URL
                </span>
              </label>
              <input
                type="url"
                {...register("photoURL", { required: true })}
                placeholder="Photo URL"
                className="input input-bordered"
              />
              {errors.photoURL && (
                <span className="text-red-600">Photo URL is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-blue-500 text-lg font-semibold">
                  Password
                </span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  maxLength: 20,
                  minLength: 8,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                name="password"
                placeholder="Your Password"
                className="input input-bordered"
                required
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600" role="alert">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600" role="alert">
                  Password must be 8 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600" role="alert">
                  Password must be below 20 characters
                </p>
              )}
            </div>
            <div className="form-control mt-6 text-white">
              <input
                className={`w-full p-3 bg-blue-500 hover:bg-blue-400 rounded-xl mt-5`}
                type="submit"
                value="Sign Up"
              />

              <h1 className="font-normal text-md text-blue-500">
                Already have an account?{" "}
                <span className="text-sky-500 hover:font-semibold">
                  <Link to={"/login"}>Log In</Link>
                </span>
              </h1>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="mx-auto">
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
