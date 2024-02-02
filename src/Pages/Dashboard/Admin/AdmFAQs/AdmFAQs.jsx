import { FaTrash } from "react-icons/fa";
import Loader from "../../../Components/Loader";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import AddFAQs from "./AddFAQs/AddFAQs";

const AdmFAQs = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: faqData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["FAQs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/FAQs`);
      return res.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqData.filter((faq) => {
    const bySearchTerm = faq.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return bySearchTerm;
  });

  const handleDelete = async (faqId, question) => {
    try {
      const result = await showConfirmationAlert(
        "Are you sure?",
        `You are about to delete the FAQ "${question}". This action cannot be undone.`,
        "Delete"
      );

      if (result.isConfirmed) {
        await axiosPublic.delete(`/FAQs/${faqId}`);
        refetch();
        showSuccessAlert("FAQ Deleted!", "FAQ deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      showErrorAlert(
        "Failed to Delete FAQ",
        "An error occurred while deleting the FAQ."
      );
    }
  };
  const reloadContents = () => {
    // Assuming you have some logic here to refetch the initial data
    refetch();
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mb-10">
      <h1 className="my-10 text-center text-3xl font-bold text-blue-500 ">
        Frequently Asked Questions
      </h1>
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/5 ml-2 flex">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-r-md w-52"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="p-3 bg-green-500 hover:bg-green-400 text-white rounded-r-xl"
            onClick={() => setSearchTerm(searchTerm)}
          >
            Search
          </button>
        </div>
        <div>
          <button
            className="p-3 bg-green-500 hover.bg-green-400 text-white rounded-xl"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            + Add FAQs
          </button>
        </div>
      </div>
      <div className="ml-2 text-black">
        <div className="overflow-x-auto">
          <table className="table bg-gray-200">
            <thead>
              <tr className="text-black text-[18px] font-semibold">
                <th>Question</th>
                <th>Answer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFAQs.map((faq) => (
                <tr key={faq._id}>
                  <td>{faq.question}</td>
                  <td>{faq.answer}</td>
                  <td className="flex gap-2">
                    {/* Add Edit and View actions if needed */}
                    <button
                      className="px-5 py-4 bg-red-500 hover:bg-red-400 text-white rounded-xl"
                      onClick={() => handleDelete(faq._id, faq.question)}
                    >
                      <FaTrash className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modals */}
      {/* Add Product Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white">
          <div className="modal-action">
            <form method="dialog">
              <button
                className="text-3xl font-bold mr-5 text-red-500"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                x
              </button>
            </form>
          </div>
          <div>
            <h3 className="font-bold text-lg text-center text-black">
              Add New Offer
            </h3>
          </div>
          <AddFAQs
            onSuccess={reloadContents}
            onClose={() => document.getElementById("my_modal_1").close()}
          />
        </div>
      </dialog>
    </div>
  );
};

export default AdmFAQs;

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
