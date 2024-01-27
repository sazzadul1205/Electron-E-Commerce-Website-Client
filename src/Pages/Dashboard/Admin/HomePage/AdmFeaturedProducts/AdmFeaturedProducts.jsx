import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import Title from "../../../../Components/Title";
import Loader from "../../../../Components/Loader";

const AdmFeaturedProducts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: admFeaturedCategories = [], isLoading } = useQuery({
    queryKey: ["admFeaturedCategories"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/featuredCategories`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Title title={"Featured Products"}></Title>
      <div className="mr-auto mb-4">
        <button className="p-3 bg-green-500 hover:bg-green-400 text-white rounded-xl">
          + Add Featured Products
        </button>
      </div>
      <div className="ml-10 text-black ">
        <div className="overflow-x-auto">
          <table className="table bg-gray-200">
            <thead>
              <tr className="text-black text-[18px] font-semibold">
                <th>Image</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admFeaturedCategories.map((category) => (
                <tr key={category._id}>
                  <td>
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-12 h-12"
                    />
                  </td>
                  <td>{category.title}</td>
                  <td className="flex gap-2">
                    <button className=" p-3 w-24 bg-yellow-500 hover:bg-yellow-400 text-white rounded-xl">
                      Update
                    </button>
                    <button className=" p-3 w-24 bg-red-500 hover:bg-red-400 text-white rounded-xl">
                      Delete
                    </button>
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

export default AdmFeaturedProducts;
