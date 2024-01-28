import { Rating } from "@smastrom/react-rating";

const ViewTestimonial = ({ testimonial }) => {
  return (
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
  );
};

export default ViewTestimonial;
