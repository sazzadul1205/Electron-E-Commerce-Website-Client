import { Link, useLocation, useNavigate } from "react-router-dom";
import background from "../../assets/background.jpg";
import { FaArrowLeft } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../Components/SocialLogin";

const Login = () => {
  const styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh", 
  };
  const { register, handleSubmit } = useForm();
  const { singIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log(data);
    singIn(data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        showSuccessLogInAlert();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        showFailedLogInAlert(error.message);
      });
  };

  const showSuccessLogInAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Login Successful!",
      text: "You are now logged in.",
    });
  };

  const showFailedLogInAlert = (errorMessage) => {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
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
      <div className="hero-content mx-auto mt-32 text-white ">
        <div className="card w-72 md:w-[500px] max-w-md shadow-2xl opacity-90">
          <h1 className="text-3xl font-bold text-center p-5 text-black">
            Please Login
          </h1>
          <h1 className="bg-red-500 text-xl text-center"> Admin Only login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-blue-500 text-lg font-semibold">
                  Email :{" "}
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
            <div className="form-control">
              <label className="label">
                <span className="label-text text-blue-500 text-lg font-semibold">
                  Password :
                </span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                })}
                name="password"
                placeholder="Your Password"
                className="input input-bordered"
                required
              />
            </div>
            <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            <div className="form-control mt-6 text-white">
              <input
                className={`w-full p-3 bg-blue-500 hover:bg-blue-400 rounded-xl mt-5`}
                type="submit"
                value="Log In"
              />
            </div>
            <h1 className="font-normal text-md text-blue-500">
                Don`t have an account?{" "}
                <span className="text-sky-500 hover:font-semibold">
                  <Link to={"/SignUp"}>SignUp</Link>
                </span>
              </h1>
          </form>
          <div className="divider">OR</div>
          <div className="mx-auto py-5">
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
