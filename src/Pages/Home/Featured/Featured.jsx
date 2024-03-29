import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";
import Title from "../../Components/Title";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Featured = () => {
  const axiosPublic = useAxiosPublic();

  const { data: featuredCategories = [], isLoading } = useQuery({
    queryKey: ["featuredCategories"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/featuredCategories`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  // Display a maximum of 5 products
  const limitedFeaturedCategories = featuredCategories.slice(0, 5);

  return (
    <div className="bg-gray-200 pb-5">
      <Title
        title={"Featured Categories"}
        subtitle={
          "Discover the latest and greatest in technology and lifestyle."
        }
      ></Title>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:max-w-[1200px] lg:mx-auto mt-5">
        {limitedFeaturedCategories.map((category) => (
          <div key={category.id} className="">
            <button className="bg-gray-300 p-5 rounded-xl">
              <img
                src={category.image}
                alt="Shoes"
                className="w-44 h-44 pb-2"
              />
              <h1 className="text-blue-500 font-bold">{category.title}</h1>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
