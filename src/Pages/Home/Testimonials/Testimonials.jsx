import Title from "../../Components/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/testimonials`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100 pb-5 ">
      <div className="max-w-4xl mx-auto text-center">
        <Title
          title={"Customer Testimonials"}
          subtitle={"See what our satisfied customers are saying about us."}
        />
      </div>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper max-w-[1200px] pb-5"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="bg-white p-6 rounded-lg shadow-md mt-5 h-60">
              <p className="text-gray-700 mb-4 h-20">{testimonial.content}</p>
              <div className="flex items-center mb-4">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.author}'s Avatar`}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                )}
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-500">
                      <Rating
                        style={{ maxWidth: 120 }}
                        value={testimonial.rating}
                        readOnly
                      />
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-black bg-blue-200 text-center font-semibold ">
                Verified Customer
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
