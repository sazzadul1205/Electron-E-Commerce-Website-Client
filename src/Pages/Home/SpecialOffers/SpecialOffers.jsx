import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Title from "../../Components/Title";
import Loader from "../../Components/Loader";

const SpecialOffers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: specialOffers = [], isLoading } = useQuery({
    queryKey: ["specialOffers"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/specialOffers`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  // Limit to a maximum of 2 offers
  const limitedSpecialOffers = specialOffers.slice(0, 2);

  return (
    <div className="max-w-[1200px] mx-auto pb-5">
      <Title
        title={"Special Offers or Promotions"}
        subtitle={
          "Discover exclusive discounts, deals, and limited-time offers."
        }
      ></Title>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-8">
        {limitedSpecialOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white p-6 rounded-lg shadow-md text-black"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="mb-4 rounded-md w-full h-72"
            />
            <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
            <p className="text-md text-red-500 mb-2">{offer.discount}</p>
            <p className="text-gray-700">{offer.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
