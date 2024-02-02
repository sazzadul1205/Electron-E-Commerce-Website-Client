import { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useForm } from "react-hook-form";

const ContactUsPage = () => {
  const { register, handleSubmit } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    setSubmittedData(data);
    document.getElementById("my_modal_1").showModal();
  };

  return (
    <div className="container mx-auto p-8 pt-28 max-w-[1200px] text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-100 shadow-xl p-8 rounded-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Reach Out to Us
          </h2>
          <p className="text-gray-700">
            Have questions, suggestions, or need assistance? Feel free to
            contact us through any of the following channels:
          </p>
          <ul className="text-left mt-4">
            <li>
              Email:{" "}
              <a href={`mailto:Psazzadul@gmail.com`} className="text-blue-500">
                Psazzadul@gmail.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+123456789" className="text-blue-500">
                +880 (191) 733-5945
              </a>
            </li>
            <li>
              Address:{" "}
              <span className="text-black">
                {" "}
                Road-4, Sekertek, Mohammadpur, Dhaka-1207, Bangladesh
              </span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Contact Form
          </h2>
          <p className="text-gray-700">
            Alternatively, you can use the contact form below to send us a
            message:
          </p>
          <div className="card w-full shadow-2xl bg-gray-800">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Id</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="Your Email Address"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">The mail</span>
                </label>
                <textarea
                  {...register("content")}
                  name="content"
                  placeholder="Your Email"
                  className="textarea textarea-bordered h-60"
                />
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="text-white p-3 justify-end bg-purple-500 hover:bg-red-800 rounded-xl text-center"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Social Media
          </h2>
          <p className="text-gray-700">
            Stay connected with us through our social media channels:
          </p>
          <div className="flex items-center justify-center mt-4 text-3xl">
            <a href="#" className="text-blue-500 hover:text-blue-700 mx-2">
              <FaFacebook />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700 mx-2">
              <FaTwitter />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700 mx-2">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Modal for displaying submitted content */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Submitted Content</h3>
          {submittedData && (
            <div>
              <p className="py-4">Name: {submittedData.name}</p>
              <p className="py-4">Email: {submittedData.email}</p>
              <p className="py-4">Content: {submittedData.content}</p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => document.getElementById("my_modal_1").close()}
                className="btn"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ContactUsPage;
