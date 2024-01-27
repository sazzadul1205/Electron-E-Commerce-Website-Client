import Title from "../../Components/Title";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";

const FeaturedBrands = () => {
  const axiosPublic = useAxiosPublic();

  const { data: featuredBrands = [], isLoading } = useQuery({
    queryKey: ["featuredBrands"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/featuredBrands`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100 ">
      <div className="container mx-auto">
        <Title
          title={"Discover Premium Brands"}
          subtitle={
            "Explore our curated selection of top-tier brands and elevate your lifestyle with quality products."
          }
        ></Title>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {featuredBrands.map((brand) => (
            <SwiperSlide key={brand.id} className="">
              <a href={brand.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="mb-4  mx-auto"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedBrands;
