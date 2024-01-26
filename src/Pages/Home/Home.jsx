import Banner from "./Banner/Banner";
import BestSellers from "./BestSellers/BestSellers";
import BlogSection from "./BlogSection/BlogSection ";
import ContactInformation from "./ContactInformation/ContactInformation";
import Featured from "./Featured/Featured";
import NewArrivals from "./NewArrivals/NewArrivals";
import NewsletterSignup from "./NewsletterSignup/NewsletterSignup";
import SpecialOffers from "./SpecialOffers/SpecialOffers";
import Testimonials from "./Testimonials/Testimonials";
import FeaturedBrands from "./featuredBrands/featuredBrands";
import ScrollToTop from "react-scroll-to-top";
const Home = () => {

  return (
    <div className="bg-white">
      <Banner></Banner>
      <Featured></Featured>
      <SpecialOffers></SpecialOffers>
      <NewArrivals></NewArrivals>
      <BestSellers></BestSellers>
      <Testimonials></Testimonials>
      <BlogSection></BlogSection>
      <NewsletterSignup></NewsletterSignup>
      <FeaturedBrands></FeaturedBrands>
      <ContactInformation></ContactInformation>
      <ScrollToTop smooth />
    </div>
  );
};

export default Home;
