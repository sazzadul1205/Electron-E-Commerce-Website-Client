import { Link } from "react-router-dom";

const ViewBlogs = ({ post }) => {
  return (
    <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
      <img
        src={post.image}
        alt={post.title}
        className="mb-4 rounded-md w-full h-60"
      />
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.excerpt}</p>
      <p className="text-gray-500">{post.date}</p>
      <Link to={post.link} className="text-blue-500 hover:underline">
        Read More
      </Link>
    </div>
  );
};

export default ViewBlogs;
