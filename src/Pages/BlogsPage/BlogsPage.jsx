import BlogCard from "./BlogCard/BlogCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";


const BlogsPage = () => {
  const axiosPublic = useAxiosPublic();

  const { data: blogData = [], isLoading } = useQuery({
    queryKey: ["blogData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogPosts`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto p-8 pt-28 max-w-[1200px] gap-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.map((blog) => (
            <BlogCard blog={blog} key={blog._id}/>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
