import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import { useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../../../Components/Loader";
import ViewTestimonial from "./ViewTestimonial/ViewTestimonial";
import { FaTrash } from "react-icons/fa";
import { SlScreenDesktop } from "react-icons/sl";

const AdmTestimonials = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: testimonials = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/testimonials`);
      return res.data;
    },
  });

  const [searchUser, setSearchUser] = useState("");

  const filteredTestimonials = testimonials.filter((testimonial) =>
    testimonial.author.toLowerCase().includes(searchUser.toLowerCase())
  );

  const handleDelete = async (testimonialId, testimonialAuthor) => {
    try {
      const result = await showConfirmationAlert(
        "Are you sure?",
        `You are about to delete the testimonial by "${testimonialAuthor}". This action cannot be undone.`,
        "Delete"
      );

      if (result.isConfirmed) {
        await axiosPublic.delete(`/testimonials/${testimonialId}`);
        refetch();
        showSuccessAlert(
          "Testimonial Deleted!",
          "Testimonial deleted successfully."
        );
      }
    } catch (error) {
      console.error(error);
      showErrorAlert(
        "Failed to Delete Testimonial",
        "An error occurred while deleting the testimonial."
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="my-10 text-center text-3xl font-bold text-blue-500">
        Testimonials
      </h1>
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/5 ml-2 flex">
          <input
            type="text"
            placeholder="Search by User..."
            className="p-2 border border-gray-300 rounded-l-md w-52"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <button
            className="p-3 bg-green-500 hover:bg-green-400 text-white rounded-r-xl"
            onClick={() => setSearchUser(searchUser)}
          >
            Search
          </button>
        </div>
      </div>
      <div className="ml-2 text-black">
        <div className="overflow-x-auto">
          <table className="table bg-gray-200">
            <thead>
              <tr className="text-black text-[18px] font-semibold">
                <th>Image</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTestimonials.map((testimonial) => (
                <tr key={testimonial._id}>
                  <td>
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.author}'s Avatar`}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                  </td>
                  <td>{testimonial.author}</td>
                  <td className="flex gap-2">
                    <button
                      className="px-5 py-4 bg-red-500 hover:bg-red-400 text-white rounded-xl"
                      onClick={() =>
                        handleDelete(testimonial._id, testimonial.author)
                      }
                    >
                      <FaTrash className="text-xl"/>
                    </button>
                    {/* View Button */}
                    <button
                      className="px-5 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl"
                      onClick={() =>
                        document
                          .getElementById(`my_modal_2_${testimonial._id}`)
                          .showModal()
                      }
                    >
                      <SlScreenDesktop className="text-xl"/>
                    </button>
                    {/* view testimonial modal */}
                    <dialog
                      id={`my_modal_2_${testimonial._id}`}
                      className="modal"
                    >
                      <div className="modal-box bg-white">
                        <div className="modal-action">
                          <form method="dialog">
                            <button
                              className="text-3xl font-bold mr-5 text-red-500"
                              onClick={() =>
                                document
                                  .getElementById(
                                    `my_modal_2_${testimonial._id}`
                                  )
                                  .close()
                              }
                            >
                              x
                            </button>
                          </form>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-center text-black">
                            View Testimonial
                          </h3>
                        </div>
                        <ViewTestimonial
                          key={testimonial._id}
                          testimonial={testimonial} // Pass the entire testimonial object
                        />
                      </div>
                    </dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdmTestimonials;

// Sweet Alerts
const showSuccessAlert = (title, text) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

const showErrorAlert = (title, text) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
  });
};

const showConfirmationAlert = (title, text, confirmButtonText) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText || "Yes, proceed!",
  });
};
