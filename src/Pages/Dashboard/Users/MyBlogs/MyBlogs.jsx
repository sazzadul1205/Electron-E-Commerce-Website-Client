import { SlScreenDesktop } from "react-icons/sl";
import AddBlogs from "../../Admin/HomePage/AdmBlogs/AddBlogs/AddBlogs";
import ViewBlogs from "../../Admin/HomePage/AdmBlogs/ViewBlogs/ViewBlogs";
import { FaTrash } from "react-icons/fa";
import Loader from "../../../Components/Loader";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";

const MyBlogs = () => {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth()
  const {
    data: myBlogPosts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myBlogPosts"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/BlogPosts?postedBy=${user.email}`);
      return res.data;
    },
  });

  const [searchTitle, setSearchTitle] = useState("");

  const filteredBlogPosts = myBlogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  const handleDelete = async (postId, postTitle) => {
    try {
      const result = await showConfirmationAlert(
        "Are you sure?",
        `You are about to delete the blog post "${postTitle}". This action cannot be undone.`,
        "Delete"
      );

      if (result.isConfirmed) {
        await axiosPublic.delete(`/BlogPosts/${postId}`);
        refetch();
        showSuccessAlert(
          "Blog Post Deleted!",
          "Blog post deleted successfully."
        );
      }
    } catch (error) {
      console.error(error);
      showErrorAlert(
        "Failed to Delete Blog Post",
        "An error occurred while deleting the blog post."
      );
    }
  };

  const openViewModal = (postId) => {
    document.getElementById(`my_modal_${postId}`).showModal();
  };
  const reloadContents = () => {
    refetch();
  };
  if (isLoading){
    return <Loader />;
  }
  return (
    <div>
      <h1 className="my-10 text-center text-3xl font-bold text-blue-500">
        Blog Posts
      </h1>
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/5 ml-2 flex">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-l-md w-52"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button
            className="p-3 bg-green-500 hover:bg-green-400 text-white rounded-r-xl"
            onClick={() => setSearchTitle(searchTitle)}
          >
            Search
          </button>
        </div>
        <button
          className="p-3 bg-green-500 hover.bg-green-400 text-white rounded-xl"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          + Add Featured Brands
        </button>
      </div>
      <div className="ml-2 text-black">
        <div className="overflow-x-auto">
          <table className="table bg-gray-200">
            <thead>
              <tr className="text-black text-[18px] font-semibold">
                <th>Image</th>
                <th>Title</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogPosts.map((post) => (
                <tr key={post._id}>
                  <td>
                    <img
                      src={post.image}
                      alt={`${post.title}'s Cover`}
                      className="w-12 h-12"
                    />
                  </td>
                  <td>{post.title}</td>
                  <td>{post.date}</td>
                  <td className="flex gap-2">
                    <button
                      className="px-5 py-4 bg-red-500 hover:bg-red-400 text-white rounded-xl"
                      onClick={() => handleDelete(post._id, post.title)}
                    >
                      <FaTrash className="text-xl" />
                    </button>
                    {/* View Button */}
                    <button
                      className="px-5 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl"
                      onClick={() => openViewModal(post._id)}
                    >
                      <SlScreenDesktop className="text-xl" />
                    </button>
                    {/* view blog post modal */}
                    <dialog id={`my_modal_${post._id}`} className="modal">
                      <div className="modal-box bg-white">
                        <div className="modal-action">
                          <form method="dialog">
                            <button
                              className="text-3xl font-bold mr-5 text-red-500"
                              onClick={() =>
                                document
                                  .getElementById(`my_modal_${post._id}`)
                                  .close()
                              }
                            >
                              x
                            </button>
                          </form>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-center text-black">
                            View Blog Post
                          </h3>
                          <ViewBlogs post={post} />
                        </div>
                      </div>
                    </dialog>
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
              Add New Product
            </h3>
          </div>
          <AddBlogs
            onSuccess={reloadContents}
            onClose={() => document.getElementById("my_modal_1").close()}
          />
        </div>
      </dialog>
    </div>
  );
};

export default MyBlogs;

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
