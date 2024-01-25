import { Link } from 'react-router-dom';
import Title from '../../Components/Title';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const BlogSection = () => {
    const blogPosts = [
        {
            id: 1,
            title: '10 Tips for Better Productivity',
            excerpt: 'Increase your daily productivity with these actionable tips.',
            date: 'January 15, 2024',
            image: 'https://i.ibb.co/n6LCqhP/10-Tips-for-Better-Productivity.png',
            link: '/blog/10-tips-for-better-productivity',
        },
        {
            id: 2,
            title: 'Exploring the Latest Technology Trends',
            excerpt: 'Stay updated on the current tech trends shaping the industry.',
            date: 'January 10, 2024',
            image: 'https://i.ibb.co/1sdpHx0/Exploring-the-Latest-Technology-Trends.jpg',
            link: '/blog/exploring-latest-technology-trends',
        },
        {
            id: 3,
            title: 'Healthy Eating Habits for a Busy Lifestyle',
            excerpt: 'Discover easy-to-follow tips for maintaining a healthy diet on a tight schedule.',
            date: 'January 5, 2024',
            image: 'https://i.ibb.co/ynCD5gq/Healthy-Eating-Habits-for-a-Busy-Lifestyle.jpg',
            link: '/blog/healthy-eating-habits',
        },
        {
            id: 4,
            title: 'The Impact of Artificial Intelligence on Businesses',
            excerpt: 'Explore how AI is revolutionizing various industries and its potential effects on businesses.',
            date: 'December 28, 2023',
            image: 'https://i.ibb.co/R6rJgqc/The-Impact-of-Artificial-Intelligence-on-Businesses.jpg',
            link: '/blog/impact-of-ai-on-businesses',
        },
        {
            id: 5,
            title: 'DIY Home Decor Ideas for a Cozy Living Space',
            excerpt: 'Get creative with these do-it-yourself home decor projects to transform your living space.',
            date: 'December 20, 2023',
            image: 'https://i.ibb.co/qDzppPz/DIY-Home-Decor-Ideas-for-a-Cozy-Living-Space.jpg',
            link: '/blog/diy-home-decor-ideas',
        },
    ];


    return (
        <div className="bg-gray-100 pb-5">
            <div className="container mx-auto">
                <Title
                    title={'Latest Blog Posts'}
                    subtitle={'Explore our latest blog posts for insightful articles and engaging content.'}
                ></Title>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {blogPosts.map((post) => (
                    <SwiperSlide key={post.id}>
                        <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                            <img src={post.image} alt={post.title} className="mb-4 rounded-md w-full h-60" />
                            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                            <p className="text-gray-700 mb-4 h-10">{post.excerpt}</p>
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
