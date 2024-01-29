import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const ViewNewsLetterSubscribers = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: viewNewsLetter = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["viewNewsLetter"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/newsLetter`);
      return res.data;
    },
  });

  const reloadContents = () => {
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="my-10 text-center text-3xl font-bold text-blue-500">
        News Letter Subscribers
      </h1>
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/5 ml-2 flex">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-l-md w-52"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="p-3 bg-green-500 hover:bg-green-400 text-white rounded-r-xl"
            onClick={reloadContents}
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
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {viewNewsLetter
                .filter((subscriber) =>
                  subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((subscriber) => (
                  <tr key={subscriber._id}>
                    <td>{subscriber.name}</td>
                    <td>{subscriber.email}</td>
                    <td>{subscriber.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewNewsLetterSubscribers;
