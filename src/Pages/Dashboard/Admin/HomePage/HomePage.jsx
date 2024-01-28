import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AdmFeaturedProducts from "./AdmFeaturedProducts/AdmFeaturedProducts";

const HomePage = () => {
  return (
    <div className="">
      <h1 className="my-10 text-center text-3xl font-bold text-black">Home Page Contents</h1>
      <Tabs>
        <TabList style={{ color: "black", marginLeft: '10px'}}>
          <Tab style={{ background: "#16c2f7", borderBottom: "1px solid #ccc", color: 'white' }}>Featured Products</Tab>
          <Tab style={{ background: "#210eeb", borderBottom: "1px solid #ccc", color: 'white' }}>Special Offers</Tab>
          <Tab style={{ background: "#ac1ee7", borderBottom: "1px solid #ccc", color: 'white' }}>Testimonials</Tab>
          <Tab style={{ background: "#c41e3a", borderBottom: "1px solid #ccc", color: 'white' }}>Blog Sections</Tab>
          <Tab style={{ background: "#123524", borderBottom: "1px solid #ccc", color: 'white' }}>Featured Brands</Tab>
        </TabList>

        <TabPanel>
          <AdmFeaturedProducts></AdmFeaturedProducts>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default HomePage;
