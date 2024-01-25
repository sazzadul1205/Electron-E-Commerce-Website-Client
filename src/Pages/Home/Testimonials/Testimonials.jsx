import Title from '../../Components/Title';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating';

const Testimonials = () => {
    const testimonials = [
        {
            id: 3,
            content: 'I love the quality of the products. Will definitely shop here again!',
            author: 'Alex Johnson',
            rating: 4,
        },
        {
            id: 4,
            content: 'Outstanding selection of products. I found exactly what I was looking for.',
            author: 'Emily White',
            image: 'https://i.ibb.co/k6XK4fq/p3.jpg',
            rating: 4.8,
        },
        {
            id: 5,
            content: 'Fast shipping and securely packaged. Impressed with the overall service.',
            author: 'Mike Johnson',
            image: 'https://i.ibb.co/yXCMW4J/p4.jpg',
            rating: 4.3,
        },
        {
            id: 6,
            content: 'Great prices and top-notch quality. Will be recommending to friends and family.',
            author: 'Jessica Davis',
            image: 'https://i.ibb.co/FYw95YL/p5.jpg',
            rating: 4.7,
        },
        {
            id: 7,
            content: 'Excellent experience with this store. Wonderful products and fantastic customer service.',
            author: 'Daniel Smith',
            image: 'https://i.ibb.co/zHhkwz0/p6.jpg',
            rating: 4.5,
        },
        {
            id: 8,
            content: 'Highly satisfied with my purchase. Will be a repeat customer for sure.',
            author: 'Sophia Brown',
            image: 'https://i.ibb.co/0V9dWJL/p7.jpg',
            rating: 4.6,
        },
        {
            id: 9,
            content: 'Prompt delivery and high-quality products. Five stars!',
            author: 'Michael Wilson',
            image: 'https://i.ibb.co/F85M9kS/p1.jpg',
            rating: 5,
        },
        {
            id: 10,
            content: 'Impressed with the variety of products available. Great online shopping experience.',
            author: 'Olivia Taylor',
            image: 'https://i.ibb.co/2df6sNz/p2.jpg',
            rating: 4.2,
        },

    ];


    return (
        <div className="bg-gray-100 pb-5">
            <div className="max-w-4xl mx-auto text-center">
                <Title
                    title={'Customer Testimonials'}
                    subtitle={'See what our satisfied customers are saying about us.'}
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
                className="mySwiper"
            >
                {testimonials.map(testimonial => (
                    <SwiperSlide key={testimonial.id}>
                        <div className="bg-white p-6 rounded-lg shadow-md mt-5 h-56">
                            <p className="text-gray-700 mb-4">{testimonial.content}</p>
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
                                                style={{ maxWidth: 180 }}
                                                value={testimonial.rating}
                                                readOnly
                                            />
                                        </span>
                                        <span className="ml-2 text-gray-500">{testimonial.rating} stars</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-black bg-blue-200 w-1/2 text-center font-semibold ">Verified Customer</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Testimonials;
