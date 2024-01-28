import { Link } from "react-router-dom";
import Title from "../../Components/Title";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";

const BlogSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogPosts`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100 pb-5">
      <div className="container mx-auto">
        <Title
          title={"Latest Blog Posts"}
          subtitle={
            "Explore our latest blog posts for insightful articles and engaging content."
          }
        ></Title>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper max-w-[1200px]"
      >
        {blogPosts.map((post) => (
          <SwiperSlide key={post.id}>
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              <img
                src={post.image}
                alt={post.title}
                className="mb-4 rounded-md w-full h-60"
              />
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <p className="text-gray-500">{post.date}</p>
              <Link to={post.link} className="text-blue-500 hover:underline">
                Read More
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogSection;
