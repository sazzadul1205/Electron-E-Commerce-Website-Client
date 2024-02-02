import { Link } from "react-router-dom";

const ViewBlogs = ({ post }) => {
  return (
    <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
      <img
        src={post.image}
        alt={post.title}
        className="mb-4 rounded-md w-full h-60"
      />
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.excerpt}</p>
      <p className="text-gray-500">{post.date}</p>
      <p className="text-gray-500">Author: {post.author}</p>
      <p className="text-gray-500">Likes: {post.likes}</p>
      <p className="text-gray-500">Ratings: {post.ratings}</p>
      <p className="text-gray-500">Review Count: {post.reviewCount}</p>
      <div className="flex space-x-2 mt-4">
        {post.tags.map((tag, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white px-2 py-1 rounded-full"
          >
            {tag}
          </div>
        ))}
      </div>
      <Link to={post.link} className="text-blue-500 hover:underline mt-4">
        Read More
      </Link>
    </div>
  );
};

export default ViewBlogs;
