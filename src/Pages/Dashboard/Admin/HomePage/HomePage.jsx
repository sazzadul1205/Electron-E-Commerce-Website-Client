import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AdmFeaturedProducts from "./AdmFeaturedProducts/AdmFeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <Tabs>
        <TabList style={{ color: "black" }}>
          <Tab style={{ background: "#16c2f7", borderBottom: "1px solid #ccc" }}>Featured Products</Tab>
          <Tab style={{ background: "#210eeb", borderBottom: "1px solid #ccc" }}>Special Offers</Tab>
          <Tab style={{ background: "#ac1ee7", borderBottom: "1px solid #ccc" }}>Testimonials</Tab>
          <Tab style={{ background: "#c41e3a", borderBottom: "1px solid #ccc" }}>Blog Sections</Tab>
          <Tab style={{ background: "#123524", borderBottom: "1px solid #ccc" }}>Featured Brands</Tab>
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
