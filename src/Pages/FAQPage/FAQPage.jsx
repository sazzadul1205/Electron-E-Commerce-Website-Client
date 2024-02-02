import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import FAQImage from "../../assets/FAQ.jfif";
import Loader from "../Components/Loader";

const FAQPage = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: faqData = [],
    isLoading,
  } = useQuery({
    queryKey: ["faqData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/FAQs`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto pt-28 pb-20 text-black max-w-[1200px]">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Frequently Asked Questions (FAQ)
      </h1>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={FAQImage}
            className="w-1/2 rounded-lg shadow-2xl"
            alt="FAQ"
          />
          <div className="grid gap-6 bg-gray-200 p-5">
            {faqData.map((item, index) => (
              <div key={index} className="collapse collapse-plus bg-gray-100">
                <input type="radio" name="my-accordion-3" id={`faq-${index}`} />
                <div className="collapse-title text-xl font-medium">
                  <label htmlFor={`faq-${index}`}>{item.question}</label>
                </div>
                <div className="collapse-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
