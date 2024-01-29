import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AdmFeaturedProducts from "./AdmFeaturedProducts/AdmFeaturedProducts";
import AdmSpecialOffers from "./AdmSpecialOffers/AdmSpecialOffers";
import AdmTestimonials from "./AdmTestimonials/AdmTestimonials";
import AdmBlogs from "./AdmBlogs/AdmBlogs";
import AdmFeaturedBrands from "./AdmFeaturedBrands/AdmFeaturedBrands";

const HomePage = () => {
  return (
    <div className="">
      <h1 className="my-10 text-center text-3xl font-bold text-black">Home Page Contents</h1>
      <Tabs>
        <TabList style={{ color: "black", marginLeft: '10px'}}>
          <Tab style={{ background: "#16c2f7", borderBottom: "1px solid #ccc", color: 'white' }}>Featured Products</Tab>
          <Tab style={{ background: "#210eeb", borderBottom: "1px solid #ccc", color: 'white' }}>Special Offers</Tab>
          <Tab style={{ background: "#ac1ee7", borderBottom: "1px solid #ccc", color: 'white' }}>Testimonials</Tab>
          <Tab style={{ background: "#c41e3a", borderBottom: "1px solid #ccc", color: 'white' }}>Blogs</Tab>
          <Tab style={{ background: "#123524", borderBottom: "1px solid #ccc", color: 'white' }}>Featured Brands</Tab>
        </TabList>

        <TabPanel>
          <AdmFeaturedProducts></AdmFeaturedProducts>
        </TabPanel>
        <TabPanel>
          <AdmSpecialOffers></AdmSpecialOffers>
        </TabPanel>
        <TabPanel>
          <AdmTestimonials></AdmTestimonials>
        </TabPanel>
        <TabPanel>
          <AdmBlogs></AdmBlogs>
        </TabPanel>
        <TabPanel>
          <AdmFeaturedBrands></AdmFeaturedBrands>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default HomePage;
