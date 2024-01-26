import Title from "../../Components/Title";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const FeaturedBrands = () => {
  const featuredBrands = [
    {
      id: 1,
      name: "Nike",
      image: "https://i.ibb.co/FDL8Sjp/Nike.png",
      link: "https://www.nike.com/",
    },
    {
      id: 2,
      name: "Adidas",
      image: "https://i.ibb.co/L57GvqN/Adidas.png",
      link: "https://www.adidas.com/",
    },
    {
      id: 3,
      name: "Apple",
      image: "https://i.ibb.co/4pyyktF/Apple.png",
      link: "https://www.apple.com/",
    },
    {
      id: 4,
      name: "Samsung",
      image: "https://i.ibb.co/9GMVBN2/Samsung.png",
      link: "https://www.samsung.com/",
    },
    {
      id: 5,
      name: "Sony",
      image: "https://i.ibb.co/rwX0DVR/Sony.png",
      link: "https://www.sony.com/",
    },
    {
      id: 6,
      name: "Microsoft",
      image: "https://i.ibb.co/xFLrH6B/Microsoft.png",
      link: "https://www.microsoft.com/",
    },
    {
      id: 7,
      name: "Google",
      image: "https://i.ibb.co/DD0GRbM/Google.png",
      link: "https://www.google.com/",
    },
    {
      id: 8,
      name: "Canon",
      image: "https://i.ibb.co/GdJmxjC/Canon.png",
      link: "https://www.canon.com/",
    },
    {
      id: 9,
      name: "LG",
      image: "https://i.ibb.co/yWZDJx3/lg.png",
      link: "https://www.lg.com/",
    },
    {
      id: 10,
      name: "Puma",
      image: "https://i.ibb.co/tbWQxdc/Puma.png",
      link: "https://us.puma.com/",
    },
    {
      id: 11,
      name: "Coca-Cola",
      image: "https://i.ibb.co/JdQTqq4/Coca-Cola.png",
      link: "https://www.coca-cola.com/",
    },
    {
      id: 12,
      name: "Toyota",
      image: "https://i.ibb.co/8B1MNnP/Toyota.png",
      link: "https://www.toyota.com/",
    },
    {
      id: 13,
      name: "Dell",
      image: "https://i.ibb.co/Bwqr9kY/Dell.png",
      link: "https://www.dell.com/",
    },
    {
      id: 14,
      name: "Adobe",
      image: "https://i.ibb.co/NS8kZGC/Adobe.png",
      link: "https://www.adobe.com/",
    },
    // Add more brands as needed...
  ];

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
            <SwiperSlide
              key={brand.id}
              className=""
            >
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
